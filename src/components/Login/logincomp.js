import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../NavBar/Navbar";

function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  // Clear any existing authentication when reaching login page
  useEffect(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
  }, []);

  // Function to try login as admin, if fail then as user
  const loginUserOrAdmin = async () => {
    // Try Admin login first
    try {
      const adminResponse = await axios.post(
        "http://localhost:3000/api/admin/login",
        { email, password }
      );

      if (adminResponse.status === 200) {
        return {
          ...adminResponse.data,
          role: adminResponse.data.role || "admin",
        };
      }
    } catch (err) {
      // Admin login failed, try user login
    }

    // Try User login
    try {
      const userResponse = await axios.post(
        "https://backend-2t4p.onrender.com/api/user/login",
        { email, password }
      );

      if (userResponse.status === 200) {
        return {
          ...userResponse.data,
          role: userResponse.data.role || "user",
        };
      }
    } catch (err) {
      throw new Error("Invalid credentials for both admin and user");
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    try {
      const data = await loginUserOrAdmin();

      // Store token, role, and id in localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userRole", data.role);
      if (data.id) {
        localStorage.setItem("userId", data.id);
      }

      // Navigate based on role
      if (data.role.toLowerCase() === "user") {
        navigate("/user-dashboard");
      } else {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      setLoginError(error.message || "Login Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handlesubmit}
          className="bg-white p-6 rounded-lg shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {loginError && (
            <div className="text-sm text-red-600 mb-4">{loginError}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:bg-white border hover:border-1 hover:border-black hover:text-black hover:font-semibold"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Loginform;
