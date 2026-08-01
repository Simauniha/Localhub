import useAuth from "../../hooks/useAuth.js";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
  if (roles && roles.length > 0 && (!user?.role || !roles.includes(user.role))) {
    return <Navigate to="/" replace />;
  }
  return children;
}
