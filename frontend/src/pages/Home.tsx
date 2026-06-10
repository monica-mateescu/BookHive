import { Hero, PopularClubs, SearchClub, UpcomingClubs } from "@/components";

function Home() {
  return (
    <>
      <Hero />

      <div className="section">
        <div className="container">
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
