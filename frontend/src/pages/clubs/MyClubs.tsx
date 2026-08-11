import {
  ErrorState,
  MyClubCard,
  MyClubListSkeleton,
  Pagination,
} from "@/components";
import { Seo } from "@/components/seo";
import { Container, InfoState } from "@/components/ui";
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
  const clubs = data?.data || [];

  const isEmpty = !isLoading && !isError && clubs.length === 0;

  return (
    <>
      <Seo
        title="My Clubs"
        description="View the book clubs you have joined or created."
        index={false}
      />
      <Container>
        <h1 className="text-center text-3xl font-semibold">My Clubs</h1>
        <div className="mt-2 text-center text-(--gray-primary)">
          View the book clubs you have joined or created.
        </div>
        <div className="my-5 w-full">
          <div className="mx-auto w-full max-w-xl space-y-5">
            {isError && (
              <ErrorState message="Something went wrong, we couldn’t load the data. Please try again later." />
            )}

            {isLoading && <MyClubListSkeleton />}

            {isEmpty ? (
              <InfoState message="You haven't joined or created any clubs yet." />
            ) : (
              <>
                <ul className="list rounded-lg bg-(--bg-card) shadow-lg ring-1 ring-(--border) backdrop-blur-sm">
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
      </Container>
    </>
  );
};

export default MyClubs;
