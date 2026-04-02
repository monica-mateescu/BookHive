import { Link } from "react-router";

import { authClient } from "../utils";
import LogoutButton from "./LogoutButton.tsx";

function Header() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="sticky top-0 z-100 mb-5 bg-gray-400 p-5 text-black">
      <nav className="max-w-8xl mx-auto flex w-full flex-row items-center justify-between">
        <Link to="/" className="hover:underline">
          Home
        </Link>

        {!isPending && (
          <div className="flex items-center gap-4">
            {!session ? (
              <>
                <Link to="/signup" className="hover:underline">
                  Sign up
                </Link>
                <span className="opacity-50">|</span>
                <Link to="/signin" className="hover:underline">
                  Sign in
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="hover:underline">
                  Hello, {session.user.name}!
                </Link>
                <span className="opacity-50">|</span>
                {session.user.role.includes("admin") && (
                  <>
                    <Link to="/dashboard" className="hover:underline">
                      Dashboard
                    </Link>
                    <span className="opacity-50">|</span>
                  </>
                )}
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
