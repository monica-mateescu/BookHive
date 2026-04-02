import { useEffect, useState } from "react";

import { BookRow } from "../../components";
import { getBooks } from "../../data/books";
import type { Book } from "../../types/book";

const Books = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);

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
    <section className="overflow-x-auto">
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
            <BookRow key={book.id} index={index + 1} book={book} />
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
    </section>
  );
};

export default Books;
