import { Navigate, Outlet } from "react-router";

import useAuth from "../contexts/useAuth";

const AdminLayout = () => {
  const { user } = useAuth();

  if (!user?.role.includes("admin")) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default AdminLayout;
