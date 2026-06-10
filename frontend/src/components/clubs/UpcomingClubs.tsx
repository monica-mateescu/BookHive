import { getClubs } from "@data";
import { useQuery } from "@tanstack/react-query";
import type { ClubsResponse } from "@types";

import { ClubCard, ClubListSkeleton, EmptyState, ErrorState } from "..";

const isActive = "true";
const status = "approved";
const upcoming = "true";

const UpcomingClubs = () => {
  const { isLoading, isError, data } = useQuery<ClubsResponse, Error>({
    queryKey: ["clubs", isActive, status, upcoming],
    queryFn: () => getClubs(1, 8, { isActive, status, upcoming }),
    staleTime: 1000 * 60 * 5,
  });

  const clubs = data?.data || [];

  if (isLoading) return <ClubListSkeleton />;
  if (isError)
    return (
      <ErrorState message="Something went wrong, we couldn’t load the data. Please try again later." />
    );

  return (
    <section aria-labelledby="clubs-title">
      <div className="mb-6 flex items-center justify-between">
        <h2
          id="clubs-title"
          className="text-xl font-semibold text-(--text-main)"
        >
          Upcoming discussions
        </h2>
      </div>
      {clubs.length === 0 ? (
        <EmptyState message="No upcoming discussions found." />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} variant="upcoming" />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default UpcomingClubs;
