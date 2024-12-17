import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  if (user && user.jwtAccessToken) {
    const decodedToken = jwtDecode(user.jwtAccessToken);
    const role = decodedToken.role;

    return allowedRoles.includes(role) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
