import { Hero, SearchClub, UpcomingClubs } from "@/components";

function Home() {
  return (
    <>
      <Hero />
      <SearchClub />
      <section aria-labelledby="clubs-title">
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="clubs-title"
            className="text-xl font-semibold text-(--text-main)"
          >
            Upcoming discussions
          </h2>
        </div>
        <UpcomingClubs />
      </section>
    </>
  );
}

export default Home;
