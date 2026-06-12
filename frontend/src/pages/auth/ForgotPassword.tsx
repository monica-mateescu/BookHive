import { Container, ForgotPasswordForm } from "@/components";
import useAuth from "@/contexts/useAuth";
import { getPageTitle } from "@/utils";
import { Navigate } from "react-router";

const ForgotPassword = () => {
  const pageTitle = getPageTitle("Forgot password");
  const { user } = useAuth();

  return user ? (
    <Navigate to="/profile" replace />
  ) : (
    <Container>
      <title>{pageTitle}</title>
      <h1 className="text-center text-3xl font-semibold">
        Forgot your password?
      </h1>
      <div className="mt-2 text-center text-(--gray-primary)">
        Enter your email address and we'll send you a link to reset your
        password.
      </div>
      <div className="my-5 w-full">
        <div className="mx-auto w-full max-w-xl">
          <ForgotPasswordForm />
        </div>
      </div>
    </Container>
  );
};

export default ForgotPassword;
