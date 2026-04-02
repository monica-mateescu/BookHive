import { NavLink, Outlet } from "react-router";

const Dashboard = () => {
  return (
    <>
      <div className="mb-4 flex space-x-4">
        <NavLink
          to="/dashboard/books"
          className="text-blue-600 hover:underline"
        >
          Books
        </NavLink>
        <NavLink
          to="/dashboard/clubs"
          className="text-blue-600 hover:underline"
        >
          Clubs
        </NavLink>
      </div>

      <Outlet />
    </>
  );
};

export default Dashboard;
