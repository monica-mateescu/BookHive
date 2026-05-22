import { ErrorState, MyClubCard, Pagination } from "@/components";
import { getMyClubs } from "@/data";
import type { ClubsResponse } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const MyClubs = () => {
  const [page, setPage] = useState(1);
  const { isLoading, isError, data } = useQuery<ClubsResponse, Error>({
    queryKey: ["clubs", { page }],
    queryFn: () => getMyClubs(page, 8),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.pagination?.totalPages ?? 1;
  if (isLoading) return "Loading...";
  if (isError)
    return (
      <ErrorState message="Something went wrong, we couldn’t load the data. Please try again later." />
    );

  const clubs = data?.data || [];

  return (
    <>
      <h1 className="text-center text-3xl font-semibold">My Clubs</h1>
      <div className="mt-2 text-center text-(--gray-primary)">
        View the book clubs you have joined or created.
      </div>
      <div className="my-5 w-full">
        <div className="mx-auto w-full max-w-xl space-y-5">
          {clubs.length === 0 ? (
            <div className="alert alert-info">No clubs found.</div>
          ) : (
            <>
              <ul className="list rounded-lg bg-(--bg-main)/80 shadow-lg ring-1 ring-black/5 backdrop-blur-sm transition hover:shadow-xl">
                {clubs.map((club) => (
                  <MyClubCard key={club.id} club={club} />
                ))}
              </ul>
              {totalPages > 1 && (
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MyClubs;
