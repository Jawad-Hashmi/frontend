import React from "react";
import axios from "axios";
import { useNavigate, Link, Routes, Route } from "react-router-dom";
import BlogEditor from "../login/components/BlogEditor";

function DashboardLayout() {
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

  const handleBlogUpload = async (content) => {
    try {
      await axios.post(
        `http://localhost:3000/api/${normalizeRole}/blogs`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Blog uploaded successfully!");
    } catch (err) {
      console.error("Blog upload failed", err);
      alert("Blog upload failed. Please try again.");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main content with nested routes */}
      <div className="flex-1 min-h-screen bg-green-100 p-8">
        <Routes>
          <Route
            path="/"
            element={<WelcomePage role={normalizeRole} />}
          />
          <Route
            path="blog-editor"
            element={<BlogEditor onUpload={handleBlogUpload} />}
          />
        </Routes>
      </div>
    </div>
  );
}

function Sidebar({ onLogout }) {
  return (
    <div className="w-64 bg-gray-100 p-4 h-screen flex flex-col">
      <h2 className="text-xl font-bold mb-6">Dashboard Menu</h2>
      <Link
        to="/admin-dashboard"
        className="mb-2 text-blue-600 font-semibold hover:underline"
      >
        📊 Dashboard
      </Link>
      <Link
        to="/admin-dashboard/blog-editor"
        className="mb-2 text-blue-600 font-semibold hover:underline"
      >
        ✏️ Blog Editor
      </Link>
      <button
        onClick={onLogout}
        className="mt-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

function WelcomePage({ role }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <h1 className="text-4xl font-bold text-green-800 mb-4">
        {role === "admin"
          ? "Welcome to Admin Dashboard"
          : "Welcome to Sub-Admin Dashboard"}
      </h1>
    </div>
  );
}

export default DashboardLayout;
