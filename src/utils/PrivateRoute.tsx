import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  roles?: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles = [] }) => {
  const userInfo = localStorage.getItem("user");
  const user = userInfo ? JSON.parse(userInfo) : null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
