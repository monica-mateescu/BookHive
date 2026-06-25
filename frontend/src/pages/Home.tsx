import {
  Container,
  Hero,
  PopularClubs,
  ProcessSection,
  SearchClub,
  UpcomingClubs,
} from "@/components";
import { Seo } from "@/components/seo";

function Home() {
  return (
    <>
      <Seo
        title="Online book club community"
        description="Discover and join online book clubs, connect with readers, and take part in meaningful reading discussions."
      />
      <div className="relative">
        <Hero
          badgeText="Online book clubs"
          title={
            <>
              Discover book clubs,
              <br />
              connect through stories.
            </>
          }
          description="Join online book clubs, share your thoughts with fellow readers, and discover new perspectives through meaningful discussions."
        />
        <div className="relative container -mt-5">
          <SearchClub />
        </div>
      </div>
      <UpcomingClubs />
      <PopularClubs />
      <Container>
        <ProcessSection
          title="Get started"
          description="Join in minutes, discover books that match your interests, and connect with readers who share your passion"
          steps={[
            {
              title: "Create account",
              label: "Sign up in under 2 minutes",
              href: "/signup",
            },
            {
              title: "Discover books",
              label: "Find curated reads for your taste",
              href: "/books",
            },
            {
              title: "Join discussions",
              label: "Connect with readers",
              href: "/clubs",
            },
          ]}
        />
      </Container>
    </>
  );
}

export default Home;
