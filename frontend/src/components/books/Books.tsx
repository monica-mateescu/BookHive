import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { BookCard, Loading, Pagination } from "..";
import { getBooks } from "../../data/books";
import type { BooksResponse } from "../../types/book";

const Books = () => {
  const [page, setPage] = useState(1);
  const { isLoading, isError, data, error } = useQuery<BooksResponse, Error>({
    queryKey: ["books", { page }],
    queryFn: () => getBooks(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div className="alert alert-error">{error?.message}</div>;

  return (
    <section className="px-5">
      <h2 className="text-center">Book list</h2>

      <div className="flex justify-center text-xs font-semibold">
        Discover the book clubs: {data?.pagination.total}
      </div>

      {data?.data?.length === 0 ? (
        <div className="alert alert-info">No clubs found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data?.data.map((book, index) => (
              <BookCard
                key={book.id}
                index={(page - 1) * data.pagination.limit + index + 1}
                book={book}
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

export default Books;
