// BlogDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function BlogDetails({ asModal = false, blogData = null, onClose = () => {} }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(blogData);
  const [loading, setLoading] = useState(!blogData);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const backendURL = "https://backend-2t4p.onrender.com";

  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole")?.toLowerCase(); // "user" or "admin"
  let currentUserId = null;

  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      currentUserId = decoded.id;
    } catch {}
  }

  // ------------------ Fetch blog ------------------
  useEffect(() => {
    if (!blogData && id) {
      const fetchBlog = async () => {
        try {
          const res = await axios.get(`${backendURL}/api/blogs/id/${id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });

          let likedByUser = false;
          if (token && res.data.likes) {
            likedByUser = res.data.likes.some((u) => u._id === currentUserId);
          }
          setBlog({ ...res.data, likedByUser });
        } catch (err) {
          console.error(err);
          navigate(role === "admin" ? "/admin/blogs" : "/user/blogs");
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    } else {
      setLoading(false);
    }
  }, [id, blogData, navigate, token, currentUserId, role]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!blog) return <div className="p-8">Blog not found</div>;

  // ------------------ Helper to get API endpoint based on role ------------------
  const apiEndpoint = (path) => {
    if (role === "admin") return `${backendURL}/api/admin/blogs/${blog._id}${path}`;
    return `${backendURL}/api/blogs/${blog._id}${path}`;
  };

  // ------------------ Like toggle ------------------
  const handleLikeToggle = async () => {
    if (!token) return alert("Login required to like the blog");

    try {
      const res = await axios.post(apiEndpoint("/like"), {}, { headers: { Authorization: `Bearer ${token}` } });
      setBlog((prev) => ({
        ...prev,
        likes: res.data.likes,
        likedByUser: res.data.likes.some((u) => u._id === currentUserId),
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to like/unlike blog");
    }
  };

  // ------------------ Submit comment ------------------
  const handleCommentSubmit = async () => {
    if (!token) return alert("Login required to comment");
    if (!commentText.trim()) return alert("Comment cannot be empty");

    try {
      const res = await axios.post(apiEndpoint("/comment"), { text: commentText }, { headers: { Authorization: `Bearer ${token}` } });
      setBlog((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), res.data.comment],
      }));
      setCommentText("");
      setSuccessMessage("Comment added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to submit comment");
    }
  };

  // ------------------ Reply to a comment ------------------
  const handleReplySubmit = async (commentId) => {
    if (!token) return alert("Login required to reply");
    const reply = replyText[commentId]?.trim();
    if (!reply) return alert("Reply cannot be empty");

    try {
      const res = await axios.post(apiEndpoint(`/comment/${commentId}/reply`), { text: reply }, { headers: { Authorization: `Bearer ${token}` } });
      setBlog((prev) => ({
        ...prev,
        comments: prev.comments.map((c) =>
          c._id === commentId ? { ...c, replies: [...(c.replies || []), res.data.reply] } : c
        ),
      }));
      setReplyText((prev) => ({ ...prev, [commentId]: "" }));
      setSuccessMessage("Reply added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to submit reply");
    }
  };

  const CloseButton = () => (
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-2xl font-bold hover:text-red-500"
    >
      &times;
    </button>
  );

  return (
    <div className={`${asModal ? "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" : ""}`}>
      <div className={`bg-white rounded-lg ${asModal ? "max-w-2xl w-full max-h-[90vh] overflow-y-auto relative" : "w-full"}`}>
        {asModal && <CloseButton />}
        <article className="p-6">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

          {/* Author & Dates */}
          <div className="mb-4">
            <p className="font-bold bg-gray-100 inline-block px-2 py-1 rounded">
              By {blog.author?.name || "Anonymous"}
            </p>
            <div className="flex justify-between text-gray-600 text-sm mt-1">
              <span>Published: {new Date(blog.createdAt).toLocaleDateString()}</span>
              {blog.updatedAt &&
                new Date(blog.updatedAt).getTime() !== new Date(blog.createdAt).getTime() && (
                  <span>Updated: {new Date(blog.updatedAt).toLocaleDateString()}</span>
                )}
            </div>
          </div>

          {blog.coverImage && (
            <img src={`${backendURL}${blog.coverImage}`} alt="Cover" className="w-full h-64 object-cover mb-6 rounded-lg" />
          )}

          {/* Content */}
          <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: blog.content || "<p>No content available</p>" }} />

          {/* Likes */}
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleLikeToggle}
              className={`px-4 py-2 rounded text-white ${blog.likedByUser ? "bg-red-500 hover:bg-red-600" : "bg-gray-500 hover:bg-gray-600"}`}
            >
              {blog.likedByUser ? "Unlike" : "Like"}
            </button>
            <span className="text-sm text-gray-700">{blog.likes?.length || 0} Likes</span>
          </div>

          {/* Success Message */}
          {successMessage && <div className="mb-4 text-green-600">{successMessage}</div>}

          {/* Comments */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <button onClick={handleCommentSubmit} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Submit
            </button>
          </div>

          {/* Existing Comments */}
          <div className="space-y-4">
            {blog.comments?.length > 0 ? (
              blog.comments.map((c) => (
                <div key={c._id} className="border p-2 rounded">
                  <p className="font-medium">{c.user?.name || "Anonymous"}:</p>
                  <p>{c.text}</p>

                  {/* Replies */}
                  <div className="ml-4 mt-2 space-y-2">
                    {c.replies?.length > 0 &&
                      c.replies.map((r) => (
                        <div key={r._id} className="border-l-2 border-gray-300 pl-2">
                          <p className="font-medium">{r.user?.name || "Anonymous"}:</p>
                          <p>{r.text}</p>
                        </div>
                      ))}

                    {/* Reply input */}
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        placeholder="Reply..."
                        value={replyText[c._id] || ""}
                        onChange={(e) => setReplyText((prev) => ({ ...prev, [c._id]: e.target.value }))}
                        className="flex-1 p-1 border rounded"
                      />
                      <button onClick={() => handleReplySubmit(c._id)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>

          {!asModal && (
            <Link to={role === "admin" ? "/admin/blogs" : "/user/blogs"} className="mt-8 inline-block text-blue-600 hover:underline">
              ← Back to Blogs
            </Link>
          )}
        </article>
      </div>
    </div>
  );
}
