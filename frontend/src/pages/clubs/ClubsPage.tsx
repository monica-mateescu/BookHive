import { Clubs } from "@/components";

const ClubsPage = () => {
  return (
    <>
      <section className="mx-auto mb-14 max-w-3xl text-center">
        <h1 className="text-3xl leading-tight font-semibold text-(--text-main)">
          Discover book clubs
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-(--gray-primary)">
          Join discussions, explore books, connect with readers
        </p>
      </section>
      <Clubs />
    </>
  );
};

export default ClubsPage;
