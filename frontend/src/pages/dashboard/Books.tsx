import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";

import { BookRow, ConfirmModal } from "../../components";
import { deleteBookById, getBooks } from "../../data/books";
import type { Book } from "../../types/book";

const Books = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery<Book[], Error>({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBookById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setSelectedBook(null);
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const errorMessage = deleteMutation.error ? "Failed to delete" : null;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div className="alert alert-error">{error.message}</div>;
  }

  return (
    <section className="overflow-x-auto p-5">
      <div className="flex justify-end">
        <Link to="create" className="btn btn-primary btn-sm mb-4">
          Add new book
        </Link>
      </div>

      <div className="flex justify-end text-xs font-semibold">
        Total books: {data?.length ?? 0}
      </div>
      {errorMessage && (
        <div className="alert alert-error mb-4">{errorMessage}</div>
      )}
      {data?.length === 0 ? (
        <div className="alert alert-info">No books found.</div>
      ) : (
        <>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Year</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((book, index) => (
                <BookRow
                  key={book.id}
                  index={index + 1}
                  book={book}
                  onDelete={() => setSelectedBook(book)}
                />
              ))}
            </tbody>
          </table>
          {selectedBook && (
            <ConfirmModal
              title={selectedBook.title}
              message="Are you sure you want to delete this book?"
              onConfirm={() => handleDelete(selectedBook.id)}
              onClose={() => setSelectedBook(null)}
              isLoading={deleteMutation.isPending}
            />
          )}
        </>
      )}
    </section>
  );
};

export default Books;
