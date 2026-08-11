import { getPopularClubs } from "@data";
import { useQuery } from "@tanstack/react-query";
import type { Club } from "@types";

import { ClubCard, ClubListSkeleton } from "..";

const PopularClubs = () => {
  const { data, isLoading } = useQuery<Club[]>({
    queryKey: ["clubs", "popular"],
    queryFn: getPopularClubs,
    staleTime: 1000 * 60 * 5,
  });

  const clubs = data || [];

  if (isLoading) return <ClubListSkeleton />;
  if (clubs.length > 0)
    return (
      <section
        aria-labelledby="popular-clubs-title"
        className="section section-muted"
      >
        <div className="container">
          <div className="mb-6 flex items-center justify-between">
            <h2
              id="popular-clubs-title"
              className="text-xl font-semibold text-(--text-main)"
            >
              Popular clubs
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} variant="popular" />
            ))}
          </div>
        </div>
      </section>
    );
};

export default PopularClubs;
