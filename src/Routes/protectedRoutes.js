import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ProtectedRoute({ children, requiredRole }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");

    // Simple auth check - no navigation blocking
    if (token && (!requiredRole || role === requiredRole)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }

    // Remove all navigation blocking logic
  }, [requiredRole]);

  if (isAuth === null) return null; // loading state
  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;