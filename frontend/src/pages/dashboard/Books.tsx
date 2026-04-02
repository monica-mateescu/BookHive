import { useEffect, useState } from "react";
import { Link } from "react-router";

import { BookRow, ConfirmModal } from "../../components";
import { deleteBookById, getBooks } from "../../data/books";
import type { Book } from "../../types/book";

const Books = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!selectedBook) return;
    try {
      await deleteBookById(selectedBook.id);
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== selectedBook.id),
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error deleting book:", error.message);
        setError(error.message);
      } else {
        console.error("Error deleting book:", error);
        setError("An unknown error occurred while deleting the book.");
      }
    } finally {
      setSelectedBook(null);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="overflow-x-auto p-5">
      <div className="flex justify-end">
        <Link to="create-book" className="btn btn-primary btn-sm mb-4">
          Add a new book
        </Link>
      </div>

      {error && <div className="alert alert-error mb-4">{error}</div>}
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
          {books.map((book, index) => (
            <BookRow
              key={book.id}
              index={index + 1}
              book={book}
              onDelete={() => setSelectedBook(book)}
            />
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Year</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
      <ConfirmModal
        isOpen={selectedBook !== null}
        title={selectedBook?.title ?? "Delete Book"}
        message="Are you sure you want to delete this book?"
        onConfirm={handleDelete}
        onClose={() => setSelectedBook(null)}
      />
    </section>
  );
};

export default Books;
