import { Container } from "@/components";
import { Seo } from "@/components/seo";
import { Link } from "react-router";

function PrivacyPolicy() {
  return (
    <Container>
      <Seo
        title="Privacy Policy"
        description="This policy explains what information BookHive collects and how it is used."
      />
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>
      <div className="mt-2 text-(--gray-primary)">
        This policy explains what information BookHive collects and how it is
        used.
      </div>
      <h2 className="mt-5 text-xl font-semibold text-(--text-main)">
        Important notice
      </h2>
      <p className="mt-2">
        BookHive is a student project created for educational purposes.
        <br />
        We do not represent a registered company and do not provide commercial
        services.
      </p>
      <h2 className="mt-5 text-xl font-semibold text-(--text-main)">
        1. What we collect
      </h2>
      <p className="mt-2">
        Depending on how you use BookHive, we may collect and store data within
        the following database collections:
      </p>
      <ul className="mt-5 list-disc space-y-2 pl-5">
        <li>
          <b className="font-semibold">User data:</b> Authentication details
          stored in user/account collections.
        </li>
        <li>
          <b className="font-semibold">Book data:</b> Information about book
          titles, authors, and details stored in books collection.
        </li>
        <li>
          <b className="font-semibold">Club data:</b> Information about book
          clubs, member associations, and settings stored in clubs collection.
        </li>
        <li>
          <b className="font-semibold">Chat messages:</b> Text messages and
          interactions sent within the club chat features, stored in messages
          collection.
        </li>
        <li>
          <b className="font-semibold">Contact requests:</b> Information you
          submit through the contact form.
        </li>
      </ul>
      <h2 className="mt-5 text-xl font-semibold text-(--text-main)">
        2. How we use information
      </h2>
      <p className="mt-2">
        As core services are exclusively accessible to registered users, your
        data is used:
      </p>
      <ul className="mt-5 list-disc space-y-2 pl-5">
        <li>
          To provide core features: authentication, managing book clubs and
          real-time messaging.
        </li>
        <li>
          To operate the admin dashboard: allowing administrators to create,
          edit or delete books and clubs, and manage user accounts.
        </li>
        <li>
          To handle contact requests. Once your request has been fully processed
          and resolved, this information will be promptly deleted.
        </li>
      </ul>
      <h2 className="mt-5 text-xl font-semibold text-(--text-main)">
        3. Data retention
      </h2>
      <p className="mt-2">
        We retain user profiles, chat history, and club contributions only as
        long as necessary to provide the platform functionality.
      </p>
      <h2 className="mt-5 text-xl font-semibold text-(--text-main)">
        4. Third-party services
      </h2>
      <p className="mt-2">
        We utilize trusted third-party providers to deliver its services:
      </p>
      <ul className="mt-5 list-disc space-y-2 pl-5">
        <li>Authentication: Better Auth.</li>
        <li>Email delivery service: Resend.</li>
        <li>Database hosting provider: MongoDB.</li>
        <li>Image hosting and delivery service: Cloudinary.</li>
        <li>
          Form protection and security verification: Cloudflare
          Turnstile/Widget.
        </li>
      </ul>
      <h2 className="mt-5 text-xl font-semibold text-(--text-main)">
        5. Cookies
      </h2>
      <p className="mt-2">
        We only use strictly necessary cookies and session tokens to keep you
        securely signed in and to ensure the core functionality.
      </p>
      <p className="mt-2">
        We do not use any non-functional, analytical, or advertising cookies to
        track your behavior or profile your activity across the web.
      </p>
      <h2 className="mt-5 text-xl font-semibold text-(--text-main)">
        6. Contact
      </h2>
      <p className="mt-2">
        If you have questions about this project or data handling, you can use
        this{" "}
        <Link to="/contact" className="underline hover:text-(--brand-primary)">
          contact form
        </Link>{" "}
        to reach out to the BookHive project team.
      </p>
    </Container>
  );
}

export default PrivacyPolicy;
