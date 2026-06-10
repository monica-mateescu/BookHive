import { Clubs, Container } from "@/components";

const ClubsPage = () => {
  return (
    <Container>
      <section className="mx-auto mb-14 max-w-3xl text-center">
        <h1 className="text-center text-3xl font-semibold">
          Discover book clubs
        </h1>
        <div className="mt-2 text-center text-(--gray-primary)">
          Join discussions, explore books, connect with readers
        </div>
      </section>
      <Clubs />
    </Container>
  );
};

export default ClubsPage;
