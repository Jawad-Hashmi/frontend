import { useLocation } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import VideoOverlay from "../Overlay/VideoOverlay";
import LogoCarousel from "../Slider/Slider";
import FullWidthTabs from "../Tabs/Tabs";
import ServiceCards from "../Cards/Cards";
import MiniCaseStudy from "../Mini Case Study/CaseStudy";
import Newsletter from "../NewsLetter/Newsletter";
import Footer from "../Footer";

function LandingPage() {
  const location = useLocation();

  // Check if we're on a dashboard page to conditionally render navbar
  const isDashboardPage = location.pathname.includes("dashboard");
  
  // Show navbar on landing page (even if logged in)
  const showNavbar = !isDashboardPage;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {showNavbar && <Navbar />}
      <VideoOverlay />
      
      {/* Heading Section */}
      <div className="text-center py-6 bg-white">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">
          The world's leading brands are powered by MM Coding Lingo
        </h1>
      </div>

      <LogoCarousel />

      {/* Video Section */}
      <div className="bg-white rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-lg p-40">
        {/* Left content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Our platform is now called M&M Coding Lingo
          </h1>
          <p className="mb-2">
            A unified platform that transcends auto and asset retail and
            finance, all powered by Artificial Intelligence.
          </p>
          <p className="mb-4">
            Transcend
            <br />
            Def.: To rise above or go beyond the limits of.
          </p>
          <button className="bg-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-black">
            Learn More &rarr;
          </button>
        </div>

        {/* Right video */}
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

      {/* Picture And Content */}
      <div className="bg-black p-4 h-auto md:h-[36rem] flex flex-col md:flex-row items-center md:items-center space-y-6 md:space-y-0 md:space-x-12">
        {/* Content on the left */}
        <div className="flex-1">
          <div className="space-y-4 md:ml-16">
            <div className="font-bold text-lg bg-white w-44 rounded-full text-center font-serif text-black bg-opacity-75 p-2">
              MarketPlace
            </div>
            <h1 className="text-4xl font-bold text-white">
              Transcend Market Place
            </h1>
            <p className="text-white text-xl leading-relaxed">
              <span className="font-bold italic text-xl block mb-2">
                Connect, configure and innovate
              </span>
              From originations to servicing, experience the most intuitive
              components
              <br />
              in asset finance and leasing.
            </p>
            <button className="bg-white text-black px-6 py-2 rounded-full font-bold bg-opacity-75">
              Learn More
            </button>
          </div>
        </div>

        {/* Image on the right */}
        <div className="flex-1 flex justify-center md:justify-end ">
          <img
            src="Jawad.jpg"
            alt="Description"
            className="w-64 h-64 md:w-[600px] md:h-[500px] rounded-lg md:mr-6"
          />
        </div>
      </div>

      {/* Cards */}
      <ServiceCards />
      <MiniCaseStudy />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default LandingPage;
