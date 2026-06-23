import { Hero, PopularClubs, SearchClub, UpcomingClubs } from "@/components";
import { Seo } from "@/components/seo";

function Home() {
  return (
    <>
      <Seo
        title="Online Book Club Community"
        description="Discover and join online book clubs, connect with readers, and take part in meaningful reading discussions."
      />
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
