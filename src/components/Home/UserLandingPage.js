import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoOverlay from "../Overlay/VideoOverlay";
import LogoCarousel from "../Slider/Slider";
import FullWidthTabs from "../Tabs/Tabs";
import ServiceCards from "../Cards/Cards";
import MiniCaseStudy from "../Mini Case Study/CaseStudy";
import Newsletter from "../NewsLetter/Newsletter";
import Footer from "../Footer";

function UserLandingPage() {
  const navigate = useNavigate();
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Profile Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsProfileSidebarOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700"
        >
          <span>👤</span>
          <span className="hidden sm:inline">Profile</span>
        </button>
      </div>

      {/* Profile Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg p-4 transform transition-transform duration-300 ease-in-out
        ${isProfileSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <h2 className="text-lg font-bold mb-6 text-blue-700">Profile Menu</h2>
        <nav className="flex flex-col gap-3">
            <button
            onClick={() => {
              navigate("/user-dashboard");
              setIsProfileSidebarOpen(false);
            }}
            className="text-left hover:text-blue-500"
          >
            🏠 Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="text-left hover:text-red-500"
          >
            🔒 Logout
          </button>
          
        </nav>

        <button
          onClick={() => setIsProfileSidebarOpen(false)}
          className="mt-auto bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-full"
        >
          Close
        </button>
      </aside>

      {/* Landing Page Content */}
      <VideoOverlay />
      <div className="text-center py-6 bg-white">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">
          The world's leading brands are powered by MM Coding Lingo
        </h1>
      </div>

      <LogoCarousel />

      {/* Video Section */}
      <div className="bg-white rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-lg">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Our platform is now called M&M Coding Lingo
          </h1>
          <p className="mb-2">
            A unified platform that transcends auto and asset retail and finance,
            all powered by Artificial Intelligence.
          </p>
          <p className="mb-4">
            Transcend
            <br />
            Def.: To rise above or go beyond the limits of.
          </p>
        </div>

        <div className="flex-1 w-full">
          <video
            className="rounded-lg w-full h-auto object-cover"
            src="Nike - Running Isn't Just Running  Spec Ad - Adam Saunders (1080p, h264).mp4"
            autoPlay
            loop
            muted
            controls={false}
          />
        </div>
      </div>

      <FullWidthTabs />
      <ServiceCards />
      <MiniCaseStudy />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default UserLandingPage;
