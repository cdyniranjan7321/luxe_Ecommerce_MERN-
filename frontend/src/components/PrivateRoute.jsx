import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function PrivateRoute({ children, adminOnly = false }) {
  const { userInfo } = useAuth();

  if (!userInfo) return <Navigate to="/login" replace />;
  if (adminOnly && !userInfo.isAdmin) return <Navigate to="/" replace />;

  return children;
}
