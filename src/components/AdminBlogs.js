import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogDetails from "./blogdetails";
import { FaEdit, FaTrash, FaStar } from "react-icons/fa";
import UpdateBlog from "./UpdateBlog";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const backendURL = "http://localhost:3000";

  const token = localStorage.getItem("authToken");
  let adminId = null;

  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      adminId = decoded.id;
    } catch (err) {
      console.error("Failed to decode token", err);
    }
  }

  // ------------------ Fetch blogs ------------------
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const adminBlogs = res.data.filter(
        (blog) =>
          (blog.author?._id && blog.author._id.toString() === adminId) ||
          (blog.createdBy && blog.createdBy.toString() === adminId)
      );

      setBlogs(adminBlogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    if (token && adminId) fetchBlogs();
  }, [token, adminId]);

  // ------------------ Open full blog details ------------------
  const openBlog = async (blogId) => {
    try {
      const res = await axios.get(`${backendURL}/api/blogs/id/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedBlog(res.data);
    } catch (err) {
      console.error("Failed to fetch blog details:", err);
    }
  };

  // ------------------ Open update modal ------------------
  const handleUpdateClick = async (blogId) => {
    try {
      const res = await axios.get(`${backendURL}/api/blogs/id/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedBlog(res.data);
      setUpdateMode(true);
    } catch (err) {
      console.error("Failed to fetch blog for edit:", err);
      alert("Failed to load blog data for editing");
    }
  };

  // ------------------ Callback after blog update ------------------
  const handleBlogUpdated = async () => {
    try {
      await fetchBlogs();
      setSelectedBlog(null);
      setUpdateMode(false);
    } catch (err) {
      console.error("Error updating blog:", err);
      setSelectedBlog(null);
      setUpdateMode(false);
    }
  };

  // ------------------ Delete blog ------------------
  const handleDeleteClick = async (blogId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      const role = localStorage.getItem("userRole")?.toLowerCase();
      await axios.delete(`${backendURL}/api/${role}/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((prev) => prev.filter((b) => b._id !== blogId));
      alert("Blog deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ------------------ Feature blog ------------------
  const handleFeatureClick = async (blogId, isFeatured) => {
    try {
      const role = localStorage.getItem("userRole")?.toLowerCase();
      await axios.patch(
        `${backendURL}/api/${role}/blogs/${blogId}/feature`,
        { isFeatured: !isFeatured },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchBlogs();
      alert(`Blog ${!isFeatured ? "marked as featured" : "unfeatured"}`);
    } catch (err) {
      console.error(err);
      alert("Feature update failed");
    }
  };

  const closeModal = () => {
    setSelectedBlog(null);
    setUpdateMode(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">📑 My Blogs</h2>

      {blogs.length === 0 ? (
        <p>No blogs created by you yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
            >
              {blog.coverImage && (
                <img
                  src={`${backendURL}${blog.coverImage}`}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 flex flex-col gap-3">
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h3>

               {/* Author & Published/Updated */}
<div className="mb-2">
  {/* Author Name */}
  <p className="font-bold bg-gray-100 inline-block px-2 py-1 rounded">
    By {blog.author?.name || "Unknown"}
  </p>

  {/* Dates */}
  <div className="flex justify-between text-gray-600 text-sm mt-1">
    {/* Created At */}
    <span>Published: {new Date(blog.createdAt).toLocaleDateString()}</span>

    {/* Updated At */}
    {blog.updatedAt && new Date(blog.updatedAt).getTime() !== new Date(blog.createdAt).getTime() && (
      <span>Updated: {new Date(blog.updatedAt).toLocaleDateString()}</span>
    )}
  </div>
</div>


                <p className="text-gray-700 mb-4 line-clamp-3">{blog.content?.replace(/<[^>]+>/g, "")}</p>

                <div className="flex justify-between items-center">
                  {/* Left-aligned Read More */}
                  <button
                    onClick={() => openBlog(blog._id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Read More →
                  </button>

                  {/* Right-aligned icons */}
                  <div className="flex gap-3 items-center">
                    <FaEdit
                      className="cursor-pointer text-green-600 hover:text-green-800"
                      title="Edit Blog"
                      onClick={() => handleUpdateClick(blog._id)}
                    />
                    <FaTrash
                      className="cursor-pointer text-red-600 hover:text-red-800"
                      title="Delete Blog"
                      onClick={() => handleDeleteClick(blog._id)}
                    />
                    <FaStar
                      className={`cursor-pointer hover:text-yellow-400 ${blog.isFeatured ? "text-yellow-500" : "text-gray-400"}`}
                      title={blog.isFeatured ? "Unfeature Blog" : "Feature Blog"}
                      onClick={() => handleFeatureClick(blog._id, blog.isFeatured)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {selectedBlog && updateMode ? (
        <UpdateBlog blogData={selectedBlog} onClose={closeModal} onUpdate={handleBlogUpdated} />
      ) : selectedBlog ? (
        <BlogDetails asModal={true} blogData={selectedBlog} onClose={closeModal} />
      ) : null}
    </div>
  );
}
