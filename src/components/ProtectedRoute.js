import { Navigate, Outlet } from "react-router-dom";
export const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("user");
  return isLoggedIn ? <Outlet /> : <Navigate to="login" />;
};
