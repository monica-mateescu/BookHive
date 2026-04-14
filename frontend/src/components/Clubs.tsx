import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { ClubCard, Loading, Pagination } from "../components";
import { getClubs } from "../data/clubs";
import type { ClubsResponse } from "../types/club";

const Clubs = () => {
  const [page, setPage] = useState(1);
  const { isLoading, isError, data, error } = useQuery<ClubsResponse, Error>({
    queryKey: ["clubs", { page }],
    queryFn: () => getClubs(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div className="alert alert-error">{error?.message}</div>;

  return (
    <section className="px-5">
      <h2 className="text-center">Club list</h2>

      <div className="flex justify-center text-xs font-semibold">
        Discover the book clubs: {data?.pagination.total}
      </div>

      {data?.data?.length === 0 ? (
        <div className="alert alert-info">No clubs found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data?.data.map((club, index) => (
              <ClubCard
                key={club.id}
                index={(page - 1) * data.pagination.limit + index + 1}
                club={club}
              />
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={data?.pagination.totalPages ?? 1}
            onPageChange={setPage}
          />
        </>
      )}
    </section>
  );
};

export default Clubs;
