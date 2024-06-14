import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../redux/auth/authSlice.ts";

const RoleBasedRedirect = () => {
  const user = useSelector(getUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "Admin" || user.role === "SuperAdmin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/home" replace />;
};

export default RoleBasedRedirect;
