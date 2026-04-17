import useAuth from "@contexts/useAuth";
import { Navigate, Outlet } from "react-router";

const AdminLayout = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default AdminLayout;
