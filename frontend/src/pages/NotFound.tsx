import { Seo } from "@/components/seo";
import { Button, ButtonLink, Container } from "@/components/ui";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Seo
        title="Page not found"
        description="The page you’re looking for might have been moved, deleted, or never
          existed."
        index={false}
      />

      <Container className="text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <p className="mb-2 text-xl">Oops... page not found</p>
        <p className="mb-8">
          The page you’re looking for might have been moved, deleted, or never
          existed.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink to="/" className="btn btn-primary">
            Go to Home
          </ButtonLink>

          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </Container>
    </>
  );
};
export default NotFound;
