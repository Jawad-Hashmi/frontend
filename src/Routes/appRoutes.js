import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../login";
import UserDashboard from "../Dashboard/userdashboard";
import DashboardLayout from "../Dashboard/dashboard";
import ProtectedRoute from "./protectedRoutes";

// Blog components
import BlogListGuest from "../components/Blogs/BlogListGuest";
import BlogDetails from "../components/blogdetails";

// Landing Page
import LandingPage from "../components/Home/LandingPage";

// Public Pages
import AboutUs from "../components/About Us/index";
import ContactUs from "../components/Contact Us/index";
import SignUp from "../components/Sign Up/index";
import Service1 from "../components/Services/index1";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page (Default Home) */}
        <Route path="/" element={<LandingPage />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* User Dashboard (Protected) */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Blog list */}
        <Route path="/blogs" element={<BlogListGuest />} />

        {/* Blog details */}
        <Route path="/user/blog/:id" element={<BlogDetails />} />

        {/* Admin Dashboard (Protected) */}
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout />
            </ProtectedRoute>
          }
        />

        {/* Public Pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/services/service1" element={<Service1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
