import { Link } from "react-router";

function Footer() {
  return (
    <footer className="flex items-center justify-center border-t-2 border-t-(--brand-primary) p-5 text-(--brand-secondary) md:flex-row">
      <Link
        to="/about"
        className="px-5 text-lg no-underline hover:text-(--brand-primary) hover:underline"
      >
        About
      </Link>
      <Link
        to="/privacy-policy"
        className="px-5 text-lg no-underline hover:text-(--brand-primary) hover:underline"
      >
        Privacy Policy
      </Link>
      <Link
        to="/contact"
        className="px-5 text-lg no-underline hover:text-(--brand-primary) hover:underline"
      >
        Contact
      </Link>
    </footer>
  );
}

export default Footer;
