import { getBooks } from "@data";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { BooksResponse } from "@types";
import { useState } from "react";

import {
  BookCard,
  BookListSkeleton,
  EmptyState,
  ErrorState,
  Pagination,
} from "..";

const Books = () => {
  const [page, setPage] = useState(1);
  const { isLoading, isError, data } = useQuery<BooksResponse, Error>({
    queryKey: ["books", { page }],
    queryFn: () => getBooks(page),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.pagination?.totalPages ?? 1;
  if (isLoading) return <BookListSkeleton />;
  if (isError)
    return (
      <ErrorState message="Something went wrong, we couldn’t load the data. Please try again later." />
    );

  return (
    <>
      {data?.data?.length === 0 ? (
        <EmptyState message="There are no books available at the moment. Please check back later." />
      ) : (
        <>
          <div className="items-strech grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data?.data.map((book) => (
              <BookCard key={book.id} book={book} />
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

export default Books;
