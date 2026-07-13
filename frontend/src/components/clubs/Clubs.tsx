import { getClubs } from "@data";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ClubsResponse } from "@types";
import { useState } from "react";
import { useSearchParams } from "react-router";

import {
  ClubCard,
  ClubListSkeleton,
  EmptyState,
  ErrorState,
  Pagination,
} from "..";

const Clubs = () => {
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const search = q || "";

  const { isLoading, isError, data } = useQuery<ClubsResponse, Error>({
    queryKey: ["clubs", page, 8, search],
    queryFn: () =>
      getClubs(page, 8, {
        q: q || undefined,
      }),
    placeholderData: keepPreviousData,
  });

  const { data: fallbackData } = useQuery<ClubsResponse, Error>({
    queryKey: ["fallback-clubs"],
    queryFn: () => getClubs(page, 8),
    enabled: !!q && data?.data?.length === 0,
  });

  const noSearchResults = data?.data?.length === 0 && q;
  const clubs = noSearchResults ? fallbackData?.data || [] : data?.data || [];

  const totalPages = data?.pagination?.totalPages ?? 1;
  if (isLoading) return <ClubListSkeleton />;
  if (isError)
    return (
      <ErrorState message="Something went wrong, we couldn’t load the data. Please try again later." />
    );

  return (
    <>
      {noSearchResults && (
        <p className="mb-6 text-center text-(--gray-primary)">
          No clubs found for “{q}”. Here are some active clubs you may like
          instead.
        </p>
      )}

      {clubs.length === 0 ? (
        <EmptyState message="There are no clubs available at the moment." />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
          {!noSearchResults && totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </>
  );
};

export default Clubs;
