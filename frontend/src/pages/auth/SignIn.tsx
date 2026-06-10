import { Container, SignInForm } from "@/components";

function SignIn() {
  return (
    <Container>
      <h1 className="text-center text-3xl font-semibold">Sign in</h1>
      <div className="mt-2 text-center text-(--gray-primary)">
        Sign in to get started.
      </div>
      <SignInForm />
    </Container>
  );
}

export default SignIn;
