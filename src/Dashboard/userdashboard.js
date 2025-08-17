import React from "react";
import { useNavigate, Link } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();
 // const token = localStorage.getItem("authToken");

  const handleLogout = async () => {
    // logout logic here (same as your code)
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-blue-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-lg font-bold mb-6 text-blue-700">Menu</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/user-dashboard" className="hover:text-blue-500">
  User Dashboard
</Link>
<Link to="/user/blogs" className="hover:text-blue-500">
  Blogs
</Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">
          Welcome to User Dashboard
        </h1>
        <p className="text-gray-700">Select “Blogs” from sidebar to view posts.</p>
      </main>
    </div>
  );
}

export default UserDashboard;
