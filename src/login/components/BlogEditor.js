import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import { createLowlight, all } from "lowlight";
import "highlight.js/styles/github.css";

const lowlight = createLowlight(all);

export default function BlogEditor() {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Heading.configure({ levels: [1, 2, 3] }),
      Youtube.configure({
        controls: true,
        modestBranding: true,
        allowFullscreen: true,
      }),
      CodeBlockLowlight.configure({ lowlight }),
      Placeholder.configure({
        placeholder: "Write your blog here...",
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setBlogContent(editor.getHTML());
    },
  });

  const addImage = () => {
    const url = prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addYouTube = () => {
    const url = prompt("Enter YouTube video URL");
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  const handleSubmit = async () => {
    if (!editor || editor.getText().trim() === "") {
      alert("Blog content cannot be empty.");
      return;
    }
    if (blogTitle.trim() === "") {
      alert("Blog title cannot be empty.");
      return;
    }

    // Combine title as first line of content
    const combinedContent = `<h1>${blogTitle}</h1>` + blogContent;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: combinedContent, // Sending both title + content here
        }),
      });

      if (res.ok) {
        alert("✅ Blog saved successfully!");
        setBlogTitle("");
        editor.commands.clearContent();
      } else {
        alert("❌ Failed to save blog.");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>

      {/* Blog Title */}
      <input
        type="text"
        placeholder="Enter blog title"
        value={blogTitle}
        onChange={(e) => setBlogTitle(e.target.value)}
        className="border rounded p-2 w-full mb-4"
      />

      {/* Toolbar */}
      {editor && (
        <div className="flex gap-2 mb-2 flex-wrap">
          <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()}>Underline</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
          <button onClick={addImage}>Image</button>
          <button onClick={addYouTube}>YouTube</button>
          <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>Code</button>
        </div>
      )}

      {/* Editor */}
      <div className="border rounded p-2 mb-4 min-h-[200px]">
        <EditorContent editor={editor} />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Publishing..." : "Publish Blog"}
      </button>
    </div>
  );
}
