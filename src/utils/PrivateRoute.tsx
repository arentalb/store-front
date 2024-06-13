import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  roles?: string[];
  mustVerified?: boolean;
}

export const PrivateRoute = ({
  roles = [],
  mustVerified,
}: PrivateRouteProps) => {
  const userInfo = localStorage.getItem("user");
  const user = userInfo ? JSON.parse(userInfo) : null;
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  if (mustVerified) {
    if (user && !user.isVerified) {
      return <Navigate to="/verify-email-request" />;
    }
  }
  return <Outlet />;
};
