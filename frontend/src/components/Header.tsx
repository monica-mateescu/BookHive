import { Link } from "react-router";

function Header() {
  return (
    <header className="sticky top-0 z-100 mb-5 flex flex-col items-center justify-center bg-gray-400 p-5 text-black md:flex-row md:justify-between">
      <nav className="flex flex-col items-center gap-2 md:flex-row">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        |
        <Link to="/signup" className="hover:underline">
          Sign up
        </Link>
        |
        <Link to="/signin" className="hover:underline">
          Sign in
        </Link>
        |
        <Link to="/create-book" className="hover:underline">
          Create book
        </Link>
      </nav>
    </header>
  );
}

export default Header;
