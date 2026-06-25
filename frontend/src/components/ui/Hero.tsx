import hero from "@/assets/images/hero.png";
import { BookOpen } from "lucide-react";

import ButtonLink from "./ButtonLink";

type HeroProps = {
  backgroundImage?: string;
  badgeIcon?: React.ComponentType<{ className?: string }>;
  badgeText: string;
  title: React.ReactNode;
  description: string;
};
const Hero = ({
  backgroundImage,
  badgeIcon: BadgeIcon = BookOpen,
  badgeText,
  title,
  description,
}: HeroProps) => {
  return (
    <div
      className="relative overflow-hidden bg-cover bg-center p-10 text-center lg:p-26"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : `url(${hero})`,
      }}
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-(--gray-secondary) px-4 py-2 text-sm font-medium">
        <BadgeIcon className="h-4 w-4" /> {badgeText}
      </div>
      <h1 className="text-3xl">{title}</h1>

      <p className="mx-auto mt-4 max-w-2xl leading-7">{description}</p>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <ButtonLink to="/clubs">Explore clubs</ButtonLink>
        <ButtonLink to="/books" variant="secondary">
          Choose a book first
        </ButtonLink>
      </div>
    </div>
  );
};

export default Hero;
