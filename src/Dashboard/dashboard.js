import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("authToken");
  const normalizeRole = role?.toLowerCase();

  const handleLogout = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/${normalizeRole}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Logout Failed", err);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      navigate("/");
    }
  };

  const handleBlogUpload = async (text) => {
    try {
      await axios.post(
        `http://localhost:3000/api/${normalizeRole}/blogs`,
        { content: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Blog uploaded successfully!");
    } catch (err) {
      console.error("Blog upload failed", err);
    }
  };

  return (
    <div className="flex">
      <Sidebar onAddBlogClick={() => {}} />
      <BlogForm
        role={normalizeRole}
        onUpload={handleBlogUpload}
        onLogout={handleLogout}
      />
    </div>
  );
}

function Sidebar({ onAddBlogClick }) {
  return (
    <div className="w-64 bg-gray-100 p-4 h-screen">
      <button
        className="text-blue-600 font-semibold"
        onClick={onAddBlogClick}
      >
        ➕ Add Blog
      </button>
    </div>
  );
}

function BlogForm({ role, onUpload, onLogout }) {
  const [text, setText] = useState("");

  const handleUpload = () => {
    if (text.trim()) {
      onUpload(text);
      setText("");
    } else {
      alert("Blog content cannot be empty.");
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col items-center justify-center bg-green-100 p-8">
      <h1 className="text-4xl font-bold text-green-800 mb-4">
        {role === "admin" ? "Welcome to Admin Dashboard" : "Welcome to Sub-Admin Dashboard"}
      </h1>

      <button
        onClick={onLogout}
        className="mb-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>

      <textarea
        className="w-full max-w-xl p-2 border rounded"
        rows="5"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your blog here..."
      />

      <button
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
}

export default Dashboard;
