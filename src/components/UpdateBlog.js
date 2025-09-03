import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateBlog({ blogData, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    privacy: "public",
    status: "draft",
    isFeatured: false,
    tags: "",
    coverImage: null,
  });

  const [author, setAuthor] = useState({
    name: "",
    email: "",
  });

  const token = localStorage.getItem("authToken");

  // ------------------ Prefill form with blog data ------------------
  useEffect(() => {
    if (blogData) {
      setFormData({
        title: blogData.title || "",
        content: blogData.content || "",
        excerpt: blogData.excerpt || blogData.content || "",
        metaTitle: blogData.metaTitle || "",
        metaDescription: blogData.metaDescription || "",
        metaKeywords: blogData.metaKeywords ? blogData.metaKeywords.join(", ") : "",
        privacy: blogData.privacy || "public",
        status: blogData.status || "draft",
        isFeatured: blogData.isFeatured || false,
        tags: blogData.tags ? blogData.tags.join(", ") : "",
        coverImage: null,
      });
      setAuthor({
        name: blogData.author?.name || "",
        email: blogData.author?.email || "",
      });
    }
  }, [blogData]);

  // ------------------ Update blog ------------------
  const handleUpdate = async () => {
    if (!token) {
      alert("Not authenticated");
      return;
    }

    try {
      // Update excerpt automatically whenever content changes
      const updatedExcerpt = formData.content.substring(0, 150); // simple example

      const formDataToSend = new FormData();
      Object.entries({ ...formData, excerpt: updatedExcerpt }).forEach(([key, value]) => {
        if (key !== "coverImage") formDataToSend.append(key, value);
      });
      if (formData.coverImage) {
        formDataToSend.append("coverImage", formData.coverImage);
      }

      formDataToSend.append("author_name", author.name);
      formDataToSend.append("author_email", author.email);

      await axios.patch(
        `https://backend-2t4p.onrender.com/api/admin/blogs/${blogData._id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Blog updated successfully!");
      if (onUpdate) onUpdate(); // trigger parent refetch
      onClose();
    } catch (err) {
      console.error("Error updating blog:", err);
      alert("Update failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10 z-50 overflow-auto">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg relative shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Update Blog</h2>

        {/* Blog ID */}
        <label className="font-semibold mb-1 block">Blog ID</label>
        <input
          type="text"
          value={blogData?._id || ""}
          readOnly
          className="border p-2 mb-4 w-full bg-gray-100 cursor-not-allowed"
        />

        {/* Title */}
        <label className="font-semibold mb-1 block">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-2 mb-4 w-full"
        />

        {/* Content */}
        <label className="font-semibold mb-1 block">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          className="border p-2 mb-4 w-full"
          rows={5}
        />

        {/* Excerpt */}
        <label className="font-semibold mb-1 block">Excerpt</label>
        <input
          type="text"
          value={formData.content.substring(0, 150)} // auto excerpt preview
          readOnly
          className="border p-2 mb-4 w-full bg-gray-100 cursor-not-allowed"
        />

        {/* Remaining fields remain same */}
        <label className="font-semibold mb-1 block">Meta Title</label>
        <input
          type="text"
          value={formData.metaTitle}
          onChange={(e) =>
            setFormData({ ...formData, metaTitle: e.target.value })
          }
          className="border p-2 mb-4 w-full"
        />

        <label className="font-semibold mb-1 block">Meta Description</label>
        <input
          type="text"
          value={formData.metaDescription}
          onChange={(e) =>
            setFormData({ ...formData, metaDescription: e.target.value })
          }
          className="border p-2 mb-4 w-full"
        />

        <label className="font-semibold mb-1 block">Meta Keywords</label>
        <input
          type="text"
          value={formData.metaKeywords}
          onChange={(e) =>
            setFormData({ ...formData, metaKeywords: e.target.value })
          }
          className="border p-2 mb-4 w-full"
        />

        <label className="font-semibold mb-1 block">Tags (comma separated)</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="border p-2 mb-4 w-full"
        />

        <label className="font-semibold mb-1 block">Cover Image</label>
        <input
          type="file"
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.files[0] })}
          className="border p-2 mb-4 w-full"
        />

        <label className="font-semibold mb-1 block">Author Name</label>
        <input
          type="text"
          value={author.name}
          onChange={(e) => setAuthor({ ...author, name: e.target.value })}
          className="border p-2 mb-4 w-full"
        />

        <label className="font-semibold mb-1 block">Author Email</label>
        <input
          type="email"
          value={author.email}
          onChange={(e) => setAuthor({ ...author, email: e.target.value })}
          className="border p-2 mb-4 w-full"
        />

        <label className="font-semibold mb-1 block">Privacy</label>
        <select
          value={formData.privacy}
          onChange={(e) => setFormData({ ...formData, privacy: e.target.value })}
          className="border p-2 mb-4 w-full"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <label className="font-semibold mb-1 block">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="border p-2 mb-4 w-full"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) =>
              setFormData({ ...formData, isFeatured: e.target.checked })
            }
          />
          Featured
        </label>

        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-4"
        >
          Update Blog
        </button>
      </div>
    </div>
  );
}

export default UpdateBlog;
