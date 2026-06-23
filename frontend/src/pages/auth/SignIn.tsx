import { Container, SignInForm } from "@/components";
import { Seo } from "@/components/seo";

function SignIn() {
  return (
    <>
      <Seo
        title="Sign in"
        description="Sign in to your account to access your clubs and discussions."
      />
      <Container>
        <h1 className="text-center text-3xl font-semibold">Sign in</h1>
        <div className="mt-2 text-center text-(--gray-primary)">
          Sign in to get started.
        </div>
        <SignInForm />
      </Container>
    </>
  );
}

export default SignIn;
