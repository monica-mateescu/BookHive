import { authClient } from "@utils";
import { NavLink } from "react-router";

import LogoutButton from "../auth/LogoutButton";

function Header() {
  const { data: session, isPending } = authClient.useSession();
  const isAdmin = session?.user?.role?.includes("admin") ?? false;

  const ProfileIcon = (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      className="md:mr-2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 11C11.7614 11 14 8.76142 14 6C14 3.23858 11.7614 1 9 1C6.23858 1 4 3.23858 4 6C4 8.76142 6.23858 11 9 11ZM9 11C11.1217 11 13.1566 11.8429 14.6569 13.3431C16.1571 14.8434 17 16.8783 17 19M9 11C6.87827 11 4.84344 11.8429 3.34315 13.3431C1.84285 14.8434 1 16.8783 1 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <header className="sticky top-0 z-100 border-b-2 border-b-(--brand-primary) bg-(--bg-main) p-5 text-(--brand-secondary)">
      <nav className="max-w-8xl mx-auto flex w-full flex-col items-center justify-start gap-5 md:flex-row md:justify-between md:gap-0">
        <NavLink
          to="/"
          className="text-xl font-semibold text-shadow-2xs hover:text-(--brand-primary)"
        >
          BookSpine
        </NavLink>

        {!isPending && (
          <div className="flex items-center justify-between gap-5">
            <NavLink
              to="/clubs"
              className={({ isActive }) =>
                `flex text-center no-underline hover:underline ${
                  isActive
                    ? "text-(--brand-primary)"
                    : "text-(--brand-secondar)"
                }`
              }
            >
              Join club
            </NavLink>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                `flex text-center no-underline hover:underline ${
                  isActive
                    ? "text-(--brand-primary)"
                    : "text-(--brand-secondar)"
                }`
              }
            >
              Find book
            </NavLink>
            {!session ? (
              <>
                <NavLink
                  to="/signin"
                  className="btn btn-primary btn-brand-primary btn-sm cursor-pointer"
                >
                  Sign in
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/my-clubs"
                  className={({ isActive }) =>
                    `flex text-center no-underline hover:underline ${
                      isActive
                        ? "text-(--brand-primary)"
                        : "text-(--brand-secondar)"
                    }`
                  }
                >
                  My Clubs
                </NavLink>
                {isAdmin && (
                  <>
                    <NavLink
                      to="/admin"
                      className={({ isActive }) =>
                        `flex text-center no-underline hover:underline ${
                          isActive
                            ? "text-(--brand-primary)"
                            : "text-(--brand-secondary)"
                        }`
                      }
                    >
                      Admin
                    </NavLink>
                  </>
                )}
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex flex-col items-center text-center no-underline hover:underline md:flex-row ${
                      isActive
                        ? "text-(--brand-primary)"
                        : "text-(--brand-secondar)"
                    }`
                  }
                >
                  {ProfileIcon}
                  Profile
                </NavLink>
                <LogoutButton />
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
