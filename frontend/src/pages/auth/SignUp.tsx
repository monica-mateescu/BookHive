import { Container, SignUpForm } from "@/components";

function SignUp() {
  return (
    <Container>
      <h1 className="text-center text-3xl font-semibold">Sign up</h1>
      <div className="mt-2 text-center text-(--gray-primary)">
        Sign up to get started.
      </div>
      <SignUpForm />
    </Container>
  );
}

export default SignUp;
