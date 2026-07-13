import { getClubs } from "@data";
import { useQuery } from "@tanstack/react-query";
import type { ClubsResponse } from "@types";

import { ClubCard, ClubListSkeleton } from "..";

const upcoming = "true";

const UpcomingClubs = () => {
  const { isLoading, data } = useQuery<ClubsResponse, Error>({
    queryKey: ["clubs", upcoming],
    queryFn: () => getClubs(1, 4, { upcoming }),
    staleTime: 1000 * 60 * 5,
  });

  const clubs = data?.data || [];

  if (isLoading) return <ClubListSkeleton />;

  if (clubs.length > 0)
    return (
      <section aria-labelledby="clubs-title" className="section">
        <div className="container">
          <div className="mb-6 flex items-center justify-between">
            <h2
              id="clubs-title"
              className="text-xl font-semibold text-(--text-main)"
            >
              Upcoming discussions
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} variant="upcoming" />
            ))}
          </div>
        </div>
      </section>
    );
};

export default UpcomingClubs;
