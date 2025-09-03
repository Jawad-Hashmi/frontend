import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";

export default function BlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    privacy: "public",
    coverImage: null,
    tags: "",
    isFeatured: false,
    status: "draft",
  });

  const [author, setAuthor] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState(null);
  const coverImageInputRef = useRef(null);

  const [adminInfo, setAdminInfo] = useState({ id: "", token: "", role: "" });

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedRole = localStorage.getItem("userRole");
    const storedAdminId = localStorage.getItem("adminId");

    if (storedToken && storedRole) {
      setAdminInfo({
        id: storedAdminId || "",
        token: storedToken,
        role: storedRole.toLowerCase(),
      });
    }
  }, []);

  // Tiptap editor setup
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Youtube.configure({ width: 480, height: 280 }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({
        ...prev,
        content: editor.getHTML(),
      }));
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("author.")) {
      const field = name.split(".")[1];
      setAuthor((prev) => ({ ...prev, [field]: value }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      setError("Please select a valid image file (JPEG, PNG, etc.)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      coverImage: file,
      coverImagePreview: URL.createObjectURL(file),
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setDebugInfo(null);

    if (!adminInfo.token || !adminInfo.role) {
      setError("Admin not authenticated");
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required");
      return;
    }

    if (!author.name.trim() || !author.email.trim()) {
      setError("Author name and email are required");
      return;
    }

    setUploading(true);

    try {
      const formDataToSend = new FormData();

      // Append blog fields except coverImage
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "coverImage") {
          formDataToSend.append(key, value);
        }
      });

      // Append author fields as flat names
      formDataToSend.append("author_name", author.name);
      formDataToSend.append("author_email", author.email);
      if (author.avatar) formDataToSend.append("author_avatar", author.avatar);

      // Append cover image
      if (formData.coverImage) {
        formDataToSend.append("coverImage", formData.coverImage);
      }

      // Debug info
      setDebugInfo({
        blog: { ...formData },
        author,
        hasCoverImage: !!formData.coverImage,
      });

      console.log("Sending token:", adminInfo.token);

      await axios.post(
        "http://localhost:3000/api/admin/blogs",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${adminInfo.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Blog created successfully!");

      // Reset form
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        privacy: "public",
        coverImage: null,
        tags: "",
        isFeatured: false,
        status: "draft",
      });

      setAuthor({ name: "", email: "", avatar: "" });
      editor.commands.clearContent();
      if (coverImageInputRef.current) coverImageInputRef.current.value = "";
      setDebugInfo(null);
    } catch (err) {
      console.error("Error creating blog:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to create blog"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 max-w-4xl mx-auto bg-white shadow rounded-lg"
      encType="multipart/form-data"
    >
      <h1 className="text-2xl font-bold">Create Blog</h1>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {debugInfo && (
        <div className="p-3 bg-blue-50 text-blue-800 rounded text-sm">
          <strong>Debug Info:</strong>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block mb-1 font-medium">Title *</label>
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Tiptap Editor */}
      <div>
        <label className="block mb-1 font-medium">Content *</label>
        <EditorContent
          editor={editor}
          className="border p-2 rounded min-h-[200px] prose max-w-none"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block mb-1 font-medium">Excerpt</label>
        <textarea
          name="excerpt"
          placeholder="Short summary"
          value={formData.excerpt}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* SEO */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-3">SEO Settings</h3>
        <div className="space-y-4">
          <input
            type="text"
            name="metaTitle"
            placeholder="Meta Title"
            value={formData.metaTitle}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="metaDescription"
            placeholder="Meta Description"
            rows={2}
            value={formData.metaDescription}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="metaKeywords"
            placeholder="Meta Keywords"
            value={formData.metaKeywords}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Author */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-3">Author *</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="author.name"
            placeholder="Name"
            value={author.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="author.email"
            placeholder="Email"
            value={author.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="author.avatar"
            placeholder="Avatar URL"
            value={author.avatar}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Cover Image */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-3">Cover Image</h3>
        <input
          type="file"
          accept="image/*"
          ref={coverImageInputRef}
          onChange={handleCoverImageUpload}
          className="w-full p-2 border rounded"
        />
        {formData.coverImagePreview && (
          <img
            src={formData.coverImagePreview}
            alt="Preview"
            className="mt-2 w-full h-48 object-cover rounded"
          />
        )}
      </div>

      {/* Tags */}
      <div>
        <label className="block mb-1">Tags</label>
        <input
          type="text"
          name="tags"
          placeholder="Comma separated"
          value={formData.tags}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Settings */}
      <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          name="privacy"
          value={formData.privacy}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
          Featured
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={uploading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 mt-4"
      >
        {uploading ? "Publishing..." : "Publish Blog"}
      </button>
    </form>
  );
}
