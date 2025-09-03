import React, { useState } from "react";
import axios from "axios";

function DeleteBlog() {
  const [blogId, setBlogId] = useState("");

  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole")?.toLowerCase();

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://backend-2t4p.onrender.com/api/${role}/blogs/${blogId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Blog deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Delete Blog</h2>
      <input
        type="text"
        placeholder="Blog ID"
        value={blogId}
        onChange={(e) => setBlogId(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Delete Blog
      </button>
    </div>
  );
}

export default DeleteBlog;
