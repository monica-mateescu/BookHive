import { Hero, PopularClubs, SearchClub, UpcomingClubs } from "@/components";

function Home() {
  return (
    <>
      <div className="relative">
        <Hero />
        <div className="absolute -bottom-5 left-0 w-full">
          <SearchClub />
        </div>
      </div>
      <UpcomingClubs />
      <PopularClubs />
    </>
  );
}

export default Home;
