import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/me");
        setAuthenticated(true);
      } catch (err) {
        setError('Authentication check failed: ' + err.message);
        setAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (authenticated === null) return <p>Loading...</p>;
  if (!authenticated) {
    console.error("ProtectedRoute error:", error?.message || error);
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
