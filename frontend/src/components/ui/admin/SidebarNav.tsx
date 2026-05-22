import { NavLink } from "react-router";

const SidebarNav = () => {
  return (
    <div className="mt-5 w-full rounded bg-(--gray-secondary)">
      <div className="w-full max-w-xl space-y-5">
        <div role="tablist" className="tabs tabs-border">
          <NavLink
            to="/admin/users"
            role="tab"
            className={`tab ({ isActive }) => isActive ? "tab-active" : ""`}
          >
            Users
          </NavLink>
          <NavLink
            to="/admin/books"
            role="tab"
            className={`tab ({ isActive }) => isActive ? "tab-active" : ""`}
          >
            Books
          </NavLink>
          <NavLink
            to="/admin/clubs"
            role="tab"
            className={`tab ({ isActive }) => isActive ? "tab-active" : ""`}
          >
            Clubs
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SidebarNav;
