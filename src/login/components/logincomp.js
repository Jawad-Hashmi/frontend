import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const loginUserOrAdmin = async () => {
    // Try admin login first
    try {
      const adminResponse = await axios.post(
        "http://localhost:3000/api/admin/login",
        {
          email,
          password,
        }
      );

      if (adminResponse.status === 200) {
        return adminResponse.data;
      }
    } catch (err) {
      // Admin login failed, try user login next
    }

    // Try user login next
    try {
      const userResponse = await axios.post(
        "http://localhost:3000/api/user/login",
        {
          email,
          password,
        }
      );
      console.log(userResponse.data);
      if (userResponse.status === 200) {
        return userResponse.data;
      } else {
        return userResponse.response;
      }
    } catch (err) {
      console.log("Error", err);
      // User login failed
      throw new Error("Invalid credentials for both admin and user");
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    try {
      const data = await loginUserOrAdmin();

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userRole", data.role);

      if (data.role.toLowerCase() === "user") {
        navigate("/user-dashboard");
      } else {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      setLoginError(error.message || "Login Failed Please Try Again");
    } finally {
      setLoading(false);
    }
  };

  return (
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
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Logging In..." : "Login"}
      </button>
    </form>
  );
}

export default Loginform;
