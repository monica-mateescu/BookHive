import { getClubs } from "@data";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ClubsResponse } from "@types";

import { ClubCard, ClubListSkeleton, EmptyState, ErrorState } from "..";

const isActive = "true";
const status = "approved";
const upcoming = "true";

const UpcomingClubs = () => {
  const { isLoading, isError, data } = useQuery<ClubsResponse, Error>({
    queryKey: ["clubs", isActive, status, upcoming],
    queryFn: () => getClubs(1, 8, { isActive, status, upcoming }),
    placeholderData: keepPreviousData,
  });

  const clubs = data?.data || [];

  if (isLoading) return <ClubListSkeleton />;
  if (isError)
    return (
      <ErrorState message="Something went wrong, we couldn’t load the data. Please try again later." />
    );

  return (
    <>
      {clubs.length === 0 ? (
        <EmptyState message="No upcoming discussions found." />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default UpcomingClubs;
