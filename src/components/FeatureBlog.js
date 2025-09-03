import React, { useState } from "react";
import axios from "axios";

function FeatureBlog() {
  const [blogId, setBlogId] = useState("");
  const [isFeatured, setIsFeatured] = useState(true);

  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole")?.toLowerCase();

  const handleFeature = async () => {
    if (!token) {
      alert("Not authenticated");
      return;
    }

    if (!blogId) {
      alert("Please enter a Blog ID");
      return;
    }

    try {
      const response = await axios.patch(
        `https://backend-2t4p.onrender.com/api/${role}/blogs/${blogId}/feature`,
        { isFeatured }, // ✅ clear field name
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert(
        `Blog successfully ${isFeatured ? "marked as featured" : "removed from featured"}`
      );
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error updating blog feature:", err);
      alert("Feature update failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Feature Blog</h2>

      {/* Blog ID input */}
      <input
        type="text"
        placeholder="Enter Blog ID"
        value={blogId}
        onChange={(e) => setBlogId(e.target.value)}
        className="border p-2 mb-2 w-full"
      />

      {/* Dropdown for feature/unfeature */}
      <select
        value={isFeatured ? "true" : "false"}
        onChange={(e) => setIsFeatured(e.target.value === "true")}
        className="border p-2 mb-2 w-full"
      >
        <option value="true">Feature</option>
        <option value="false">Unfeature</option>
      </select>

      <button
        onClick={handleFeature}
        className="bg-yellow-600 text-white px-4 py-2 rounded"
      >
        Update Feature
      </button>
    </div>
  );
}

export default FeatureBlog;
