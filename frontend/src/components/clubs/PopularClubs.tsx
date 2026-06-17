import { getPopularClubs } from "@data";
import { useQuery } from "@tanstack/react-query";
import type { Club } from "@types";

import { ClubCard, ClubListSkeleton, ErrorState } from "..";

const PopularClubs = () => {
  const { data, isLoading, isError } = useQuery<Club[]>({
    queryKey: ["clubs", "popular"],
    queryFn: getPopularClubs,
    staleTime: 1000 * 60 * 5,
  });

  const clubs = data || [];

  if (isLoading) return <ClubListSkeleton />;
  if (isError)
    return (
      <ErrorState message="Something went wrong, we couldn’t load the data. Please try again later." />
    );
  return (
    clubs.length > 0 && (
      <section aria-labelledby="popular-clubs-title">
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
      </section>
    )
  );
};

export default PopularClubs;
