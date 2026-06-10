import { Container } from "lucide-react";
import { Link } from "react-router";

const EmailVerified = () => {
  return (
    <Container className="text-center">
      <h1 className="mb-10 text-center text-3xl font-semibold">
        Email verified
      </h1>
      <p className="text-md font-semibold text-(--gray-primary)">
        Your email has been verified successfully.{" "}
        <Link to="/profile" className="text-(--brand-primary) underline">
          See your profile
        </Link>
      </p>
    </Container>
  );
};

export default EmailVerified;
