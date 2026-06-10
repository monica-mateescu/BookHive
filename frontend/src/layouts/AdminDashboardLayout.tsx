import { Container, SidebarNav } from "@/components";
import { Outlet, useLocation } from "react-router";

const Dashboard = () => {
  const location = useLocation();
  const isIndexRoute = location.pathname === "/admin";
  return (
    <Container>
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
    </Container>
  );
};

export default Dashboard;
