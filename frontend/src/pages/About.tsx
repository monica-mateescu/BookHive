import { Hero, ProcessSection } from "@/components";
import { Seo } from "@/components/seo";
import { Link } from "react-router";

function About() {
  return (
    <>
      <Seo
        title="About this project and its mission"
        description="Discover how to blend the offline joy of reading with digital connection."
      />

      <Hero
        badgeText="About this project"
        title={
          <>
            Together is
            <br />a beautiful place to be.
          </>
        }
        description="We believe that reading books is a powerful way to protect inner
            peace, understand emotions, and bring us closer together. Because
            human connection often starts in the smallest moments—and so many of
            them begin with a story."
      />
      <div className="section container">
        <section>
          <div className="mx-auto max-w-2xl space-y-2 rounded-2xl border-2 border-dashed border-(--brand-primary)/30 p-10 text-center">
            <p className="text-(--gray-primary)">
              BookHive was born from a simple yet profound mission: to blend the
              offline experience of reading with the power of digital
              connection. We are building a space where opening a book means
              opening a door to talk, to share, and to find a place where we
              belong.
            </p>
          </div>
        </section>

        <ProcessSection
          variant="about"
          title="How it works today"
          description="This is just the beginning of our journey. Discover how you can become part of the hive today."
          steps={[
            {
              title: "Step 1",
              label: "Sign up",
              href: "/signup",
            },
            {
              title: "Step 2",
              label: "Discover books",
              href: "/books",
            },
            {
              title: "Step 3",
              label: "Join or create a club",
              href: "/clubs",
            },
            {
              title: "Step 4",
              label: "Enjoy offline & meet online",
            },
          ]}
        />

        <section>
          <div className="mx-auto mt-15 max-w-xl space-y-2 text-center">
            <h2 className="text-2xl font-semibold text-(--text-main)">
              What is BookHive about?
            </h2>
            <p className="text-(--gray-primary)">
              Whether you are reading the book, writing it, or bringing it to
              the community, there is a place for you in our hive:
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Card 1: For Readers */}
            <div className="card rounded-lg bg-(--bg-main)/80 shadow-lg ring-1 ring-black/5 backdrop-blur-sm transition hover:shadow-xl">
              <div className="card-body">
                <div className="mb-2 flex items-center gap-2">
                  <div className="rounded-lg bg-(--gray-secondary) p-2 text-(--brand-primary)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <h3 className="card-title text-lg font-semibold text-(--text-main)">
                    For readers
                  </h3>
                </div>
                <p className="text-(--gray-primary)">
                  Discover your next book and connect with like-minded people.
                  BookHive helps you turn solitary reading into a shared journey
                  of personal growth and friendship.
                </p>
              </div>
            </div>

            {/* Card 2: For Authors */}
            <div className="card rounded-lg bg-(--bg-main)/80 shadow-lg ring-1 ring-black/5 backdrop-blur-sm transition hover:shadow-xl">
              <div className="card-body">
                <div className="mb-2 flex items-center gap-2">
                  <div className="rounded-lg bg-(--gray-secondary) p-2 text-(--brand-primary)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>
                  </div>
                  <h3 className="card-title text-lg font-semibold text-(--text-main)">
                    For authors
                  </h3>
                </div>
                <p className="text-(--gray-primary)">
                  BookHive is your platform to present your work directly to
                  passionate readers and engaged community around your stories.
                </p>
              </div>
            </div>

            {/* Card 3: For Printers & Publishers */}
            <div className="card rounded-lg bg-(--bg-main)/80 shadow-lg ring-1 ring-black/5 backdrop-blur-sm transition hover:shadow-xl">
              <div className="card-body">
                <div className="mb-2 flex items-center gap-2">
                  <div className="rounded-lg bg-(--gray-secondary) p-2 text-(--brand-primary)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M7 7h10" />
                      <path d="M7 12h10" />
                      <path d="M7 17h10" />
                    </svg>
                  </div>
                  <h3 className="card-title text-lg font-semibold text-(--text-main)">
                    For printers & publishers
                  </h3>
                </div>
                <p className="text-(--gray-primary)">
                  Join us as a technical partner for dedicated readers and
                  talented authors to turn digital manuscripts into printed
                  reality and bring beautiful books to life.
                </p>
              </div>
            </div>

            {/* Card 4: For Bookstores & Libraries */}
            <div className="card rounded-lg bg-(--bg-main)/80 shadow-lg ring-1 ring-black/5 backdrop-blur-sm transition hover:shadow-xl">
              <div className="card-body">
                <div className="mb-2 flex items-center gap-2">
                  <div className="rounded-lg bg-(--gray-secondary) p-2 text-(--brand-primary)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <h3 className="card-title text-lg font-semibold text-(--text-main)">
                    For bookstores & libraries
                  </h3>
                </div>
                <p className="text-(--gray-primary)">
                  By organizing your own book clubs and hosting hybrid reading
                  events through BookHive, you can attract new visitors and
                  expand your local literary hubs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto mt-15 max-w-xl space-y-2 text-center">
            <h2 className="text-2xl font-semibold text-(--text-main)">
              Do you have some feedback for us?
            </h2>
            <p className="text-(--gray-primary)">
              We are very excited to hear from you! Send us a message and let’s
              grow a kind-hearted community for reading and connection together.
            </p>
            <Link
              to="/contact"
              className="btn btn-primary btn-brand-primary btn-sm mt-2 cursor-pointer"
            >
              Contact us
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;
