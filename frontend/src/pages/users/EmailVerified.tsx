import { Container } from "@/components";
import { Seo } from "@/components/seo";
import { ButtonLink } from "@/components/ui";

const EmailVerified = () => {
  return (
    <>
      <Seo
        title="Email verified"
        description="Your email has been successfully verified."
        index={false}
      />
      <Container className="text-center">
        <h1 className="text-center text-3xl font-semibold">You're all set</h1>
        <div className="mt-2 mb-8 text-center text-(--gray-primary)">
          Your email address has been verified. Thanks for confirming — your
          account is now fully active.
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink to="/">Go to homepage</ButtonLink>
          <ButtonLink to="/profile" variant="secondary">
            Go to profile
          </ButtonLink>
        </div>
      </Container>
    </>
  );
};

export default EmailVerified;
