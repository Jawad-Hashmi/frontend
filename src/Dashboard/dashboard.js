import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import BlogEditor from "../components/BlogEditor";
import Blogs from "../components/AdminBlogs";

function DashboardLayout() {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("authToken");
  const normalizeRole = role?.toLowerCase();

  // --- Check auth on load and prevent cached access ---
  useEffect(() => {
    const checkAuth = () => {
      const tokenCheck = localStorage.getItem("authToken");
      const roleCheck = localStorage.getItem("userRole");
      if (!tokenCheck || !["admin","sub-admin"].includes(roleCheck)) {
        navigate("/login", { replace: true });
      }
    };

    checkAuth();

    const handlePopState = () => {
      checkAuth();
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    window.onpageshow = (event) => {
      if (event.persisted) {
        checkAuth();
      }
    };

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.onpageshow = null;
    };
  }, [navigate]);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/${normalizeRole}/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Logout Failed", err);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      navigate("/login", { replace: true });
    }
  };

  // Blog create
  const handleBlogUpload = async (content) => {
    try {
      await axios.post(
        `http://localhost:3000/api/${normalizeRole}/blogs`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Blog uploaded successfully!");
    } catch (err) {
      console.error("Blog upload failed", err);
      alert("Blog upload failed. Please try again.");
    }
  };

  return (
    <div className="flex">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 min-h-screen bg-green-100 p-8 overflow-y-auto ml-64">
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-3xl font-bold text-green-800">
                {role === "admin"
                  ? "Welcome to Admin Dashboard"
                  : "Welcome to Sub-Admin Dashboard"}
              </h1>
            }
          />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blog-editor" element={<BlogEditor onUpload={handleBlogUpload} />} />
        </Routes>
      </div>
    </div>
  );
}

// Sidebar
function Sidebar({ onLogout }) {
  return (
    <div className="w-64 bg-gray-100 p-4 h-screen fixed left-0 top-0 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Dashboard Menu</h2>

      <Link to="/admin-dashboard" className="mb-2 block text-blue-600 font-semibold hover:underline">
        📊 Dashboard
      </Link>

      <Link to="/admin-dashboard/blogs" className="mb-2 block text-blue-600 font-semibold hover:underline">
        📑 My Blogs
      </Link>

      <Link to="/admin-dashboard/blog-editor" className="mb-2 block text-blue-600 font-semibold hover:underline">
        ✏️ Blog Editor (Create)
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

export default DashboardLayout;
