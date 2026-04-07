import { Navigate, Outlet } from "react-router";

import useAuth from "../contexts/useAuth";

const AdminLayout = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default AdminLayout;
