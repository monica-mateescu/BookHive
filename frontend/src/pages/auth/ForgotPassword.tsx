import { Container, ForgotPasswordForm } from "@/components";
import { SeoNoIndex } from "@/components/seo";
import useAuth from "@/contexts/useAuth";
import { Navigate } from "react-router";

const ForgotPassword = () => {
  const { user } = useAuth();

  return user ? (
    <Navigate to="/profile" replace />
  ) : (
    <>
      <SeoNoIndex
        title="Forgot password"
        description="Reset your password to regain access to your account."
      />
      <Container>
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
    </>
  );
};

export default ForgotPassword;
