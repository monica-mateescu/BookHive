import { NavLink } from "react-router";

const SidebarNav = () => {
  return (
    <div className="drawer-side z-100">
      <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>

      <ul className="menu bg-base-100 text-base-content min-h-full w-64 p-4 font-bold">
        <li>
          <NavLink
            to="/dashboard/books"
            className={({ isActive }) =>
              isActive ? "active text-primary" : ""
            }
          >
            Books
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/clubs"
            className={({ isActive }) =>
              isActive ? "active text-primary" : ""
            }
          >
            Clubs
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidebarNav;
