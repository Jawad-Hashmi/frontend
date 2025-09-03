import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react"; // ✅ Profile icon

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // mobile sidebar
  const [isHovered, setIsHovered] = useState(false); // hover effect
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Check login status
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");

    if (token && role) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();

        if (!isExpired && (role === "user" || role === "admin")) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("authToken");
          localStorage.removeItem("userRole");
        }
      } catch (err) {
        console.error("Invalid token", err);
        setIsLoggedIn(false);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // ✅ Handle scroll hiding
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`shadow-md fixed w-full top-0 left-0 z-20 transition-transform duration-300 transition-colors ${
          isHovered ? "bg-white text-black" : "bg-black/70 text-white"
        } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="container mx-auto flex justify-between items-center px-6 py-6">
          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col space-y-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>

          {/* Website Name */}
          <h1 className="text-2xl font-bold">M&M Coding Lingo</h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 items-center">
            <li>
              <Link
                to="/"
                className="hover:text-black hover:font-bold transition"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/services/service1"
                className="hover:text-black hover:font-bold transition"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className="hover:text-black hover:font-bold transition"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-black hover:font-bold transition"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-black hover:font-bold transition"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Contact Us
              </Link>
            </li>
          </ul>

          {/* ✅ Profile + Auth (Top Right Corner) */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Profile Icon */}
                <button
                onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
                  onClick={() => setIsProfileSidebarOpen(true)}
                  className="p-2 rounded-full transition hover:text-black hover:font-bold "
                >
                  <User className="w-6 h-6" />
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="transition px-3 py-1 rounded hover:text-black hover:font-bold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="hover:text-black hover:font-bold transition"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="hover:text-black hover:font-bold transition"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-30`}
      >
        <button
          className="absolute top-4 right-4 text-gray-600 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
        <ul className="flex flex-col space-y-6 mt-16 px-6 text-lg">
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/services/service1" onClick={() => setIsOpen(false)}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/blogs" onClick={() => setIsOpen(false)}>
              Blogs
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>
          </li>

          {/* Auth Buttons */}
          {isLoggedIn ? (
            <>
              <li>
                <button
                  onClick={() => {
                    setIsProfileSidebarOpen(true);
                    setIsOpen(false);
                  }}
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* ✅ Profile Sidebar (Slider) */}
      {isLoggedIn && (
        <aside
          
          className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg p-4 transform transition-transform duration-300 ease-in-out
          ${isProfileSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <h2 className="text-lg font-bold mb-6 text-blue-700">Profile Menu</h2>
          <nav className="flex flex-col gap-3">
            <Link
              to="/user-dashboard"
              className="hover:text-blue-500"
              onClick={() => setIsProfileSidebarOpen(false)}
            >
              📊 Dashboard
            </Link>
          </nav>

          <button
            onClick={() => setIsProfileSidebarOpen(false)}
            className="mt-auto bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-full"
          >
            Close
          </button>
        </aside>
      )}
    </>
  );
}

export default Navbar;
