import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../NavBar/Navbar";
import { ArrowLeft } from "lucide-react";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("form"); // form → otp
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // --- Send OTP after filling form ---
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://backend-2t4p.onrender.com/api/user/send-otp", {
        name,
        email,
        password,
      });
      setStep("otp");
      setSuccess("OTP sent successfully to your email");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Verify OTP ---
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post("https://backend-2t4p.onrender.com/api/user/verify-otp", {
        email,
        otp,
      });

      navigate("/login"); // Redirect to login after success
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Resend OTP ---
  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post("https://backend-2t4p.onrender.com/api/user/resend-otp", {
        email,
      });
      setSuccess("OTP resent successfully. Check your email again.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <form
        onSubmit={step === "form" ? handleSendOtp : handleVerifyOtp}
        className="bg-white p-6 rounded-lg shadow-md w-96 mx-auto mt-24"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        {/* Step 1: Name, Email, Password */}
        {step === "form" && (
          <>
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            <div className="mb-4">
              <label className="block mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full border px-3 py-2 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {/* Step 2: OTP */}
        {step === "otp" && (
          <>
            <div className="mb-4">
              <label className="block mb-1">Enter OTP</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            {/* 🔙 Back Icon Button */}
            <button
              type="button"
              onClick={() => {
                setOtp(""); // clear OTP when going back
                setStep("form");
              }}
              className="flex items-center justify-center w-full bg-gray-300 text-black py-2 rounded mb-3 hover:bg-gray-400"
            >
              <ArrowLeft className="mr-2" size={18} /> Back
            </button>

            {/* Resend OTP Button */}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={loading}
              className="w-full bg-gray-700 text-white py-2 rounded mb-3 hover:bg-gray-900"
            >
              {loading ? "Resending..." : "Resend OTP"}
            </button>
          </>
        )}

        {/* Error Message */}
        {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

        {/* Success Message */}
        {success && <div className="text-sm text-green-600 mb-4">{success}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-white border hover:border-black hover:text-black hover:font-semibold"
        >
          {loading
            ? "Processing..."
            : step === "form"
            ? "Send OTP"
            : "Verify OTP"}
        </button>
      </form>
    </>
  );
}

export default SignUp;
