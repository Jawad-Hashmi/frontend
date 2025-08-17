import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function BlogDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("authToken");
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (!token || !id) return;

    axios
      .get(`http://localhost:3000/api/user/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBlog(res.data))
      .catch((err) => {
        console.error("Failed to fetch blog", err);
        setBlog(null);
      });
  }, [id, token]);

  if (!blog) return <p className="p-8">Loading blog...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{blog.title || "Untitled Blog"}</h1>
      <p className="text-sm text-gray-500 mb-4">
        Posted on {new Date(blog.createdAt).toLocaleString()}
      </p>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <Link to="/user/blogs" className="mt-6 inline-block text-blue-600 hover:underline">
        ← Back to Blogs
      </Link>
    </div>
  );
}
