import Navbar from "../NavBar/Navbar";
import React from "react";

function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-black text-white py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="max-w-2xl mx-auto text-lg">
            We are a passionate team dedicated to building solutions that
            empower businesses and people to achieve more.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-4 text-black">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to create innovative, user-friendly, and reliable
              technology solutions that help businesses grow faster and
              individuals achieve their goals with ease.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-4 text-black">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              We envision a world where technology simplifies everyday
              challenges, empowers people, and drives sustainable progress for
              communities worldwide.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-6 bg-white">
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Team Member 1 */}
            <div className="text-center">
              <img
                src="j.jpg"
                alt="team member"
                className="w-32 h-32 rounded-full mx-auto mb-4 shadow"
              />
              <h3 className="font-semibold text-lg">Asfand Yar Khan</h3>
              <p className="text-gray-500">BackEnd Developer</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <img
                src="k.jpg"
                alt="team member"
                className="w-32 h-32 rounded-full mx-auto mb-4 shadow"
              />
              <h3 className="font-semibold text-lg">Abdul Moiz</h3>
              <p className="text-gray-500">FrontEnd Developer</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <img
                src="l.jpg"
                alt="team member"
                className="w-32 h-32 rounded-full mx-auto mb-4 shadow"
              />
              <h3 className="font-semibold text-lg">Abu Siyaf</h3>
              <p className="text-gray-500">FrontEnd Developer</p>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="py-20 bg-black text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Want to work with us?</h2>
          <p className="mb-6 text-lg">
            Join us on our journey to make technology simple and impactful.
          </p>
          <button className="px-6 py-3 bg-black text-white font-semibold rounded shadow hover:bg-white border hover:border-1px hover:border-black hover:text-black hover:font-semibold transition">
            Get in Touch
          </button>
        </section>
      </div>
    </>
  );
}

export default AboutUs;
