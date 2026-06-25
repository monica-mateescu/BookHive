import { Seo } from "@/components/seo";
import { Link } from "react-router";

import ButtonLink from "../components/ui/ButtonLink";

function About() {
  return (
    <>
      <Seo
        title="About this project and its mission"
        description="Discover how to blend the offline joy of reading with digital connection."
      />
      <div className="relative">
        <section
          className="relative overflow-hidden rounded-lg bg-cover bg-center p-10 text-center lg:p-26"
          style={{ backgroundImage: 'url("/src/assets/images/hero.png")' }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-(--gray-secondary) px-4 py-2 text-sm font-medium text-(--brand-primary)">
            About this project
          </div>
          <h1 className="text-3xl leading-tight font-semibold text-(--text-main)">
            Together is
            <span className="block text-(--brand-primary)">
              a beautiful place to be.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-(--gray-primary)">
            We believe that reading books is a powerful way to protect inner
            peace, understand emotions, and bring us closer together. Because
            human connection often starts in the smallest moments—and so many of
            them begin with a story.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink to="/clubs" className="rounded-xl px-6">
              Explore clubs
            </ButtonLink>
            <ButtonLink
              to="/books"
              variant="secondary"
              className="rounded-xl px-6"
            >
              Choose a book first
            </ButtonLink>
          </div>
        </section>
      </div>
      <div className="section container">
        <section>
          <div className="mx-auto max-w-2xl space-y-2 rounded-2xl border-2 border-dashed border-(--brand-primary)/30 p-10 text-center">
            <p className="text-lg font-medium">
              In today’s rapidly changing world, our minds rarely find a moment
              of true stillness and grounding, often leaving us feeling
              disconnected from ourselves and others. When you turn the pages of
              a book, the chaos of the outside world fades away, and a moment to
              reconnect with yourself opens up. But stories are not meant to be
              read just alone.
            </p>
            <p className="text-(--gray-primary)">
              BookHive was born from a simple yet profound mission: to blend the
              offline experience of reading with the power of digital
              connection. We are building a space where opening a book means
              opening a door to talk, to share, and to find a place where we
              belong.
            </p>
          </div>
        </section>

        <section>
          <div className="mt-15 grid grid-cols-1 items-center gap-10 rounded-3xl bg-(--gray-secondary)/30 p-10 lg:grid-cols-12 lg:pt-0">
            <div className="space-y-2 lg:col-span-5">
              <div className="text-xs font-bold tracking-wider text-(--brand-primary) uppercase">
                Process
              </div>
              <h2 className="text-2xl font-semibold text-(--text-main)">
                How it works today
              </h2>
              <p className="text-sm text-(--gray-primary)">
                This is just the beginning of our journey. Discover how you can
                become part of the hive today.
              </p>
            </div>

            <div className="lg:col-span-7">
              {/* DaisyUI Timeline */}
              <ul className="timeline timeline-vertical lg:timeline-horizontal timeline-compact">
                <li>
                  <div className="timeline-middle">
                    <div className="h-5 w-5 rounded-full bg-(--brand-primary)"></div>
                  </div>
                  <div className="timeline-end lg:timeline-start bg-base-100 border-base-200 mb-10 rounded-xl border p-4 shadow-xs lg:mb-0">
                    <span className="block font-semibold text-(--text-main)">
                      Step 1
                    </span>
                    <Link
                      to="/signup"
                      className="text-sm font-medium text-(--brand-primary) underline hover:opacity-80"
                    >
                      Sign up
                    </Link>
                  </div>
                  <hr className="bg-(--brand-primary)" />
                </li>
                <li>
                  <hr className="bg-(--brand-primary)" />
                  <div className="timeline-middle">
                    <div className="h-5 w-5 rounded-full bg-(--brand-primary)"></div>
                  </div>
                  <div className="timeline-end lg:timeline-start bg-base-100 border-base-200 mb-10 rounded-xl border p-4 shadow-xs lg:mb-0">
                    <span className="block font-semibold text-(--text-main)">
                      Step 2
                    </span>
                    <Link
                      to="/books"
                      className="text-sm font-medium text-(--brand-primary) underline hover:opacity-80"
                    >
                      Discover books
                    </Link>
                  </div>
                  <hr className="bg-(--brand-primary)" />
                </li>
                <li>
                  <hr className="bg-(--brand-primary)" />
                  <div className="timeline-middle">
                    <div className="h-5 w-5 rounded-full bg-(--brand-primary)"></div>
                  </div>
                  <div className="timeline-end lg:timeline-start bg-base-100 border-base-200 mb-10 rounded-xl border p-4 shadow-xs lg:mb-0">
                    <span className="block font-semibold text-(--text-main)">
                      Step 3
                    </span>
                    <Link
                      to="/clubs"
                      className="text-sm font-medium text-(--brand-primary) underline hover:opacity-80"
                    >
                      Join or create a club
                    </Link>
                  </div>
                  <hr className="bg-(--brand-primary)" />
                </li>
                <li>
                  <hr className="bg-(--brand-primary)" />
                  <div className="timeline-middle">
                    <div className="h-5 w-5 rounded-full bg-(--brand-primary)"></div>
                  </div>
                  <div className="timeline-end lg:timeline-start bg-base-100 border-base-200 rounded-xl border p-4 shadow-xs">
                    <span className="block font-semibold text-(--text-main)">
                      Step 4
                    </span>
                    <span className="text-sm text-(--gray-primary)">
                      Enjoy offline & meet online
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

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
