import { Link } from "react-router";

function Footer() {
  return (
    <footer className="flex flex-col border-t-2 border-t-(--brand-primary) p-5 text-center text-(--brand-secondary)">
      <div className="mb-2 flex flex-col items-center justify-center gap-5 md:flex-row">
        <Link
          to="/about"
          className="no-underline hover:text-(--brand-primary) hover:underline"
        >
          About
        </Link>
        <Link
          to="/privacy-policy"
          className="no-underline hover:text-(--brand-primary) hover:underline"
        >
          Privacy Policy
        </Link>
        <Link
          to="/contact"
          className="no-underline hover:text-(--brand-primary) hover:underline"
        >
          Contact
        </Link>
      </div>
      © 2026 All rights reserved
    </footer>
  );
}

export default Footer;
