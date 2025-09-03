// BlogListGuest.js
import React from "react";
import BlogListUser from "./BlogListUser";
import Navbar from "../NavBar/Navbar"; // or a different GuestNavbar if you have

export default function BlogListGuest() {
  return (
    <>
      {/* Guest Navbar */}
      <Navbar />

      {/* Reuse BlogListUser */}
      <div className="mt-20">
        <BlogListUser />
      </div>
    </>
  );
}
