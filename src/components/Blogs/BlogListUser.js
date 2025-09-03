// BlogListUser.js
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import BlogDetails from "../blogdetails";
import Navbar from "../NavBar/Navbar";

export default function BlogListUser() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [filters, setFilters] = useState({
    author: "",
    dateFrom: "",
    dateTo: "",
    search: "",
  });

  const backendURL = "https://backend-2t4p.onrender.com";

  // ---------------- Fetch all blogs ----------------
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ---------------- Filtering ----------------
  const refreshFilteredBlogs = useCallback(() => {
    let result = [...blogs];

    if (filters.author) {
      result = result.filter((b) =>
        b.author?.name?.toLowerCase().includes(filters.author.toLowerCase())
      );
    }
    if (filters.dateFrom) {
      result = result.filter(
        (b) => new Date(b.createdAt) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      result = result.filter(
        (b) => new Date(b.createdAt) <= new Date(filters.dateTo)
      );
    }
    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title?.toLowerCase().includes(term) ||
          b.content?.toLowerCase().includes(term)
      );
    }

    setFilteredBlogs(result);
  }, [blogs, filters]);

  useEffect(() => {
    refreshFilteredBlogs();
  }, [blogs, filters, refreshFilteredBlogs]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // ---------------- Blog Modal ----------------
  const openBlogModal = async (blog) => {
    try {
      const res = await axios.get(`${backendURL}/api/blogs/id/${blog._id}`);
      setSelectedBlog(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load blog details");
    }
  };

  const closeBlogModal = () => setSelectedBlog(null);

  return (
    <>
    <div className="min-h-screen container mx-auto px-4 py-6 mt-20">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4"> Blogs</h2>
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
            placeholder="Search title/content"
            value={filters.search}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBlogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="w-full h-full mx-auto  bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Blog Image */}
              <div className="w-full h-60 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                {blog.coverImage ? (
                  <img
                    src={`${backendURL}${blog.coverImage}`}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-sm">No Image</span>
                )}
              </div>

              {/* Blog Content */}
              <div className="p-5 w-[80%] h-[60%]  -mt-[40px] bg-white  relative z-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3 line-clamp-2">
                  {blog.title}
                </h3>

                <div className="flex items-center text-xs uppercase tracking-wide text-gray-500 mb-2">
                  <span className="text-red-500 font-medium">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  <span className="mx-2 text-red-500">•</span>
                  <span>{blog.author?.name || "Unknown"}</span>
                </div>

                {/* Excerpt */}
                {blog.excerpt && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {blog.excerpt.replace(/<[^>]+>/g, "")}
                  </p>
                )}

                <div className="w-10 h-0.5 bg-red-500 mb-3"></div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.content?.replace(/<[^>]+>/g, "")}
                </p>

                <button
                  onClick={() => openBlogModal(blog)}
                  className="text-red-500 text-xs font-semibold uppercase tracking-wide hover:text-red-700"
                >
                  Read More →
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Blog Modal */}
      {selectedBlog && (
        <BlogDetails
          asModal={true}
          blogData={selectedBlog}
          onClose={closeBlogModal}
        />
      )}
    </div>
    </>
  );
}
