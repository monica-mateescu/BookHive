import { Clubs, Container } from "@/components";
import { Seo } from "@/components/seo";

const ClubsPage = () => {
  return (
    <>
      <Seo
        title="Discover book clubs"
        description="Discover online book clubs, connect with readers, and join communities built around shared reading interests."
      />

      <Container>
        <section className="mx-auto mb-14 max-w-3xl text-center">
          <h1 className="text-center text-3xl font-semibold">
            Discover book clubs
          </h1>
          <div className="mt-2 text-center text-(--gray-primary)">
            Join discussions, explore books, connect with readers.
          </div>
        </section>
        <Clubs />
      </Container>
    </>
  );
};

export default ClubsPage;
