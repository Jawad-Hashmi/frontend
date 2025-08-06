import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [blogs, setBlogs] = useState([]);

  // ✅ Fetch blogs when token changes
  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:3000/api/user/blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Failed to fetch blogs", err));
  }, [token]);

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/user/logout",
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

  return (
    <div className="min-h-screen bg-blue-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">
        Welcome to User Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="mb-8 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>

      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">📚 Latest Blogs</h2>

        {blogs.length === 0 ? (
          <p className="text-gray-600">No blogs available yet.</p>
        ) : (
          blogs.map((blog, index) => (
            <div
              key={index}
              className="mb-4 p-4 bg-white shadow-md rounded border border-gray-200"
            >
              <p className="text-gray-800">{blog.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Posted on {new Date(blog.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
