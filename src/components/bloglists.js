// BlogList.js
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import BlogDetails from "./blogdetails";
import UpdateBlog from "./UpdateBlog";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [filters, setFilters] = useState({ author: "", dateFrom: "", dateTo: "", search: "" });
  const [comment, setComment] = useState("");

  const backendURL = "http://localhost:3000";

  // ------------------ Fetch all blogs ------------------
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/blogs`);
      setBlogs(res.data.map(blog => ({ ...blog, likedByUser: false })));
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ------------------ Filters ------------------
  const refreshFilteredBlogs = useCallback(() => {
    let result = [...blogs];
    if (filters.author)
      result = result.filter(blog =>
        blog.author?.name?.toLowerCase().includes(filters.author.toLowerCase())
      );
    if (filters.dateFrom)
      result = result.filter(blog => new Date(blog.createdAt) >= new Date(filters.dateFrom));
    if (filters.dateTo)
      result = result.filter(blog => new Date(blog.createdAt) <= new Date(filters.dateTo));
    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter(
        blog =>
          blog.title?.toLowerCase().includes(term) ||
          blog.content?.toLowerCase().includes(term)
      );
    }
    setFilteredBlogs(result);
  }, [blogs, filters]);

  useEffect(() => {
    refreshFilteredBlogs();
  }, [blogs, filters, refreshFilteredBlogs]);

  const handleFilterChange = e =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  // ------------------ Like ------------------
  const handleLikeToggle = async blog => {
    const token = localStorage.getItem("authToken");
    if (!token) return alert("Login required to like the blog");

    try {
      await axios.post(
        `${backendURL}/api/blogs/${blog._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  // ------------------ Comment ------------------
  const handleCommentSubmit = async blogId => {
    const token = localStorage.getItem("authToken");
    if (!token) return alert("Login required to comment");
    if (!comment.trim()) return;

    try {
      await axios.post(
        `${backendURL}/api/blogs/${blogId}/comment`,
        { text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment("");
      await fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  // ------------------ Modal helpers ------------------
  const selectedBlog = blogs.find(b => b._id === selectedBlogId);

  const openBlogModal = blogId => setSelectedBlogId(blogId);
  const closeModal = () => {
    setSelectedBlogId(null);
    setUpdateMode(false);
  };

  const handleUpdateClick = blog => {
    setSelectedBlogId(blog._id);
    setUpdateMode(true);
  };

  // ------------------ Update blog ------------------
  const handleBlogUpdated = async updatedBlog => {
    try {
      await fetchBlogs();
      setUpdateMode(false);
      setSelectedBlogId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Filter Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={filters.author}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={filters.search}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Blog list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          filteredBlogs.map(blog => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {blog.coverImage && (
                <img
                  src={`${backendURL}${blog.coverImage}`}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h3>

                {/* Author & Published/Updated */}
                <p className="text-gray-600 text-sm mb-2">
                  By {blog.author?.name || "Unknown"} • {new Date(blog.createdAt).toLocaleDateString()}
                  {blog.updatedAt &&
                    new Date(blog.updatedAt).getTime() !== new Date(blog.createdAt).getTime() && (
                      <span> • Updated at {new Date(blog.updatedAt).toLocaleDateString()}</span>
                    )}
                </p>

                <p className="text-gray-700 mb-4 line-clamp-3">
                  {blog.content?.replace(/<[^>]+>/g, "")}
                </p>

                {/* Buttons: Read More left, others right */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => openBlogModal(blog._id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Read More →
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLikeToggle(blog)}
                      className={`px-3 py-1 rounded text-white ${
                        blog.likedByUser ? "bg-gray-500" : "bg-red-500"
                      } hover:bg-red-600`}
                    >
                      {blog.likedByUser ? "Unlike" : "Like"}
                    </button>
                    <button
                      onClick={() => handleUpdateClick(blog)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      {selectedBlog && !updateMode && (
        <BlogDetails asModal={true} blogData={selectedBlog} onClose={closeModal}>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={() => handleCommentSubmit(selectedBlog._id)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit
            </button>
            <div className="mt-4 space-y-2">
              {selectedBlog.comments?.length > 0 ? (
                selectedBlog.comments.map(c => (
                  <div key={c._id} className="border p-2 rounded">
                    <p className="font-medium">{c.user?.name || "Unknown"}:</p>
                    <p>{c.text}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </div>
        </BlogDetails>
      )}

      {selectedBlog && updateMode && (
        <UpdateBlog
          blogData={selectedBlog}
          onClose={() => setUpdateMode(false)}
          onUpdate={handleBlogUpdated}
        />
      )}
    </div>
  );
}
