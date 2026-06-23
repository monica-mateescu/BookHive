import { Container, ResetPasswordForm } from "@/components";
import { Seo } from "@/components/seo";
import useAuth from "@/contexts/useAuth";
import { Navigate, useSearchParams } from "react-router";

const ResetPassword = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || undefined;

  if (!token) return <Navigate to="/signin" replace />;

  return user ? (
    <Navigate to="/profile" replace />
  ) : (
    <>
      <Seo
        title="Reset password"
        description="Set a new password for your account."
        index={false}
      />
      <Container>
        <h1 className="text-center text-3xl font-semibold">
          Reset your password
        </h1>
        <div className="mt-2 text-center text-(--gray-primary)">
          Enter your new password below to reset your password.
        </div>
        <div className="my-5 w-full">
          <div className="mx-auto w-full max-w-xl">
            <ResetPasswordForm token={token} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default ResetPassword;
