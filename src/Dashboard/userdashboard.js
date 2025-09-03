import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import BlogListUser from "../components/Blogs/BlogListUser";
import axios from "axios";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // ✅ Auth check for dashboard
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");

    if (!token || role !== "user") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // ✅ Logout function (with backend API call)
  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole"); // should be "user"

    try {
      await axios.post(
        `https://backend-2t4p.onrender.com/api/${role}/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Logout Failed", err);
    } finally {
      // Clear local storage no matter what
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");

      navigate("/login", { replace: true });
    }
  };

  // ✅ Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !e.target.closest("#sidebar-toggle")
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Left Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg p-4 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:w-64`}
      >
        <h2 className="text-lg font-bold mb-6 text-blue-700">Menu</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/user-dashboard" className="hover:text-blue-500">
            🏠 Dashboard
          </Link>
          <Link to="#" className="hover:text-blue-500">
            📚 Blogs
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white shadow-md p-4 lg:px-8">
          <button
            id="sidebar-toggle"
            className="lg:hidden p-2 rounded-md border hover:bg-gray-100"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>

          <h1 className="text-2xl font-bold text-blue-800">User Dashboard</h1>

          {/* Profile Button */}
          <div>
            <button
              onClick={() => setIsProfileSidebarOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700"
            >
              <span>👤</span>
              <span className="hidden sm:inline">Profile</span>
            </button>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 p-8 overflow-y-auto">
          <p className="text-gray-700 mb-6">Browse all blogs below.</p>
          <BlogListUser />
        </main>
      </div>

      {/* Right Profile Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg p-4 transform transition-transform duration-300 ease-in-out
        ${isProfileSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <h2 className="text-lg font-bold mb-6 text-blue-700">Profile Menu</h2>
        <nav className="flex flex-col gap-3">
          <Link
            to="/"
            className="hover:text-blue-500"
            onClick={() => setIsProfileSidebarOpen(false)}
          >
            🏠 Home
          </Link>
        </nav>

        <button
          onClick={() => setIsProfileSidebarOpen(false)}
          className="mt-auto bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-full"
        >
          Close
        </button>
      </aside>
    </div>
  );
}
