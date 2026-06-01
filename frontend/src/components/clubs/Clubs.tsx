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

  const filters = {
    isActive: "true",
    status: "approved",
    q: q || undefined,
  };

  const { isLoading, isError, data } = useQuery<ClubsResponse, Error>({
    queryKey: ["clubs", q, page],
    queryFn: () => getClubs(page, 8, filters),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.pagination?.totalPages ?? 1;
  if (isLoading) return <ClubListSkeleton />;
  if (isError)
    return (
      <ErrorState message="Something went wrong, we couldn’t load the data. Please try again later." />
    );

  return (
    <>
      {data?.data?.length === 0 ? (
        <EmptyState message="There are no clubs available at the moment." />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data?.data.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
          {totalPages > 1 && (
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
