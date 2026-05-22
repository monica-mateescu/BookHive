import { SidebarNav } from "@/components";
import { Outlet, useLocation } from "react-router";

const Dashboard = () => {
  const location = useLocation();
  const isIndexRoute = location.pathname === "/admin";
  return (
    <>
      {isIndexRoute ? (
        <>
          <Outlet />
          <SidebarNav />
        </>
      ) : (
        <>
          <SidebarNav />
          <Outlet />
        </>
      )}
    </>
  );
};

export default Dashboard;
