import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/login",
        {
          email,
          password,
        }
      );

      //   if (response.status === 200) {
      //     navigate("/dashboard");
      //   }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Login Failed Please Try Again");
      }
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
      <div className="mp-4">
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

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:"
        bg-blue-700
      >
        Login
      </button>
    </form>
  );
}
export default Loginform;
