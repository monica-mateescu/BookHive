import { ClubForm, Container } from "@/components";
import { SeoNoIndex } from "@/components/seo";

const ClubCreate = () => {
  return (
    <>
      <SeoNoIndex
        title="Create a book club"
        description="Start your own book club and connect with fellow readers. Share your reading interests, host discussions, and build a community around books you love."
      />
      <Container>
        <ClubForm />
      </Container>
    </>
  );
};

export default ClubCreate;
