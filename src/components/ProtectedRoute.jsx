import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { userToken, loading } = useAuth();
  if (loading) return null; 

  return userToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
