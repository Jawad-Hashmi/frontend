import Navbar from "../NavBar/Navbar";
import React from "react";

function ContactUs() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Get in touch</h1>
        <p className="text-gray-600 text-lg">
          Ready to help your company scale faster? Let's chat about how we can help.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="mb-4 text-hover:bg-white border hover:border-1px hover:border-black hover:text-black hover:font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16h6"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-1">Chat to sales</h3>
          <p className="text-gray-500 mb-4">Speak to our friendly team.</p>
          <button className="px-4 py-2 bg-black text-white rounded hover:bg-white border hover:border-1px hover:border-black hover:text-black hover:font-semibold transition">
            Chat to sales
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="mb-4 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 8v8M8 8v8M12 4v16"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-1">Chat to support</h3>
          <p className="text-gray-500 mb-4">We're here to help.</p>
          <button className="px-4 py-2 bg-black text-white rounded hover:bg-white border hover:border-1px hover:border-black hover:text-black hover:font-semibold transition">
            Chat to support
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="mb-4 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-1">Visit us</h3>
          <p className="text-gray-500 mb-4">Visit our office HQ.</p>
          <button className="px-4 py-2 bg-black text-white rounded hover:bg-white border hover:border-1px hover:border-black hover:text-black hover:font-semibold transition">
            Get directions
          </button>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="mb-4 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7-5 7 5v10l-7 5-7-5V8z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-1">Call us</h3>
          <p className="text-gray-500 mb-4">Mon-Fri from 8am to 5pm</p>
          <button className="px-4 py-2 bg-black text-white rounded hover:bg-white border hover:border-1px hover:border-black hover:text-black hover:font-semibold transition">
            Call our team
          </button>
        </div>
      </div>

      {/* Message Form */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-2">Message us</h2>
        <p className="text-gray-500 mb-6">
          We'll get back to you within 24 hours.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="First name"
            className="border border-gray-300 p-3 rounded w-full"
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-gray-300 p-3 rounded w-full"
          />
          <input
            type="email"
            placeholder="you@company.com"
            className="border border-gray-300 p-3 rounded w-full md:col-span-2"
          />
          <input
            type="tel"
            placeholder="Phone number"
            className="border border-gray-300 p-3 rounded w-full md:col-span-2"
          />
          <textarea
            placeholder="Your message..."
            className="border border-gray-300 p-3 rounded w-full md:col-span-2 h-32"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-black text-white rounded hover:bg-white border hover:border-1px hover:border-black hover:text-black hover:font-semibold transition md:col-span-2"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default ContactUs;
