import hero from "@/assets/images/hero.png";
import { BookOpen } from "lucide-react";

import ButtonLink from "./ButtonLink";

const Hero = () => {
  return (
    <section
      className="relative overflow-hidden rounded-lg bg-cover bg-center p-10 text-center lg:p-26"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-(--gray-secondary) px-4 py-2 text-sm font-medium text-(--brand-primary)">
        <BookOpen className="h-4 w-4" /> Online book clubs
      </div>
      <h1 className="text-3xl leading-tight font-semibold text-(--text-main)">
        Discover book clubs,
        <span className="block text-(--brand-primary)">
          connect through stories.
        </span>
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-(--gray-primary)">
        Join online book clubs, share your thoughts with fellow readers, and
        discover new perspectives through meaningful discussions.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <ButtonLink to="/clubs" className="rounded-xl px-6">
          Explore clubs
        </ButtonLink>
        <ButtonLink to="/books" variant="secondary" className="rounded-xl px-6">
          Choose a book first
        </ButtonLink>
      </div>
    </section>
  );
};

export default Hero;
