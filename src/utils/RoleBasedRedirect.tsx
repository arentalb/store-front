import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../redux/auth/authSlice.ts";
import { ADMIN, SUPER_ADMIN } from "../constants/roles.ts";

const RoleBasedRedirect = () => {
  const user = useSelector(getUser);

  if (!user) {
    return <Navigate to="/home" replace />;
  }

  if (user.role === ADMIN || user.role === SUPER_ADMIN) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/home" replace />;
};

export default RoleBasedRedirect;
