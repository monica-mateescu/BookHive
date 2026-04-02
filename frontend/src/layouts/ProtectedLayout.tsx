import { Navigate, Outlet } from "react-router";

import useAuth from "../contexts/useAuth";

const ProtectedLayout = () => {
  const { user, isPending } = useAuth();

  if (isPending) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedLayout;
