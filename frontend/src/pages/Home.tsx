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
      <section>
        <div className="m-15 mx-auto max-w-2xl space-y-2 text-center">
          <h2 className="text-2xl font-semibold text-(--text-main)">
            Connect through the power of stories
          </h2>
          <p>
            In today’s rapidly changing world, our minds rarely find a moment of
            true stillness and grounding, often leaving us feeling disconnected
            from ourselves and others. When you turn the pages of a book, the
            chaos of the outside world fades away, and a moment to reconnect
            with yourself opens up. But stories are not meant to be read just
            alone. So we invite you on an exciting journey to discover new
            stories and connect together.
          </p>
        </div>
      </section>
      <UpcomingClubs />
      <PopularClubs />
      <Container>
        <ProcessSection
          title="Get started"
          description="Join in minutes, discover books that match your interests, and connect with readers who share your passion."
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
