import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../login";
import UserDashboard from "../Dashboard/userdashboard";
import Dashboard from "../Dashboard/dashboard";
import ProtectedRoute from "./protectedRoutes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
