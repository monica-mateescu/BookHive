import { Hero, PopularClubs, SearchClub, UpcomingClubs } from "@/components";

function Home() {
  return (
    <>
      <div className="relative">
        <Hero />
        <div className="absolute -bottom-5 left-0 z-20 w-full">
          <SearchClub />
        </div>
      </div>
      <div className="section section--muted">
        <div className="container">
          <UpcomingClubs />
        </div>
      </div>

      <div className="section">
        <div className="container">
          <PopularClubs />
        </div>
      </div>
    </>
  );
}

export default Home;
