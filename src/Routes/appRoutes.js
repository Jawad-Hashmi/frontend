import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../login";
import UserDashboard from "../Dashboard/userdashboard";
import DashboardLayout from "../Dashboard/dashboard";
import ProtectedRoute from "./protectedRoutes";
import BlogList from "../login/components/bloglists"; // Will handle list view
import BlogDetails from "../login/components/blogdetails"; // New separate details component

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* User Dashboard */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Blog list */}
        <Route
          path="/user/blogs"
          element={
            <ProtectedRoute>
              <BlogList />
            </ProtectedRoute>
          }
        />

        {/* Blog details */}
        <Route
          path="/user/blog/:id"
          element={
            <ProtectedRoute>
              <BlogDetails />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
