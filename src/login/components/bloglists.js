import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BlogList() {
  const token = localStorage.getItem("authToken");
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:3000/api/user/blogs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBlogs(res.data))
      .catch((err) => {
        console.error("Failed to fetch blogs", err);
        setBlogs([]);
      });
  }, [token]);

  const closeModal = () => {
    setSelectedBlog(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6 text-blue-600">User Menu</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="/user-dashboard" className="hover:text-blue-500">
            User Dashboard
          </Link>
          <Link to="/user/blogs" className="hover:text-blue-500">
            Blogs
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          📚 Latest Blogs
        </h2>

        {blogs.length === 0 ? (
          <p className="text-gray-600">No blogs available yet.</p>
        ) : (
          blogs.map((blog) => {
            const plainText = blog.content
              ?.replace(/<[^>]+>/g, "") // Remove HTML tags
              .trim()
              .split("\n")
              .filter((line) => line.trim() !== "");

            const firstLine = plainText?.[0] || "Untitled Blog";

            return (
              <div
                key={blog._id}
                className="mb-6 p-4 bg-white shadow-md rounded border border-gray-200"
              >
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  {blog.title || firstLine}
                </h3>
                <p className="text-gray-700 truncate">{firstLine}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Posted on {new Date(blog.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="mt-3 inline-block text-blue-600 hover:underline"
                >
                  Read More →
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full h-[90vh] flex flex-col relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
            >
              ✖
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6">
              {/* Title */}
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                {selectedBlog.title || "Untitled Blog"}
              </h2>

              {/* Content */}
              <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
              />

              {/* Date */}
              <p className="text-sm text-gray-500 mt-4">
                Posted on {new Date(selectedBlog.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
