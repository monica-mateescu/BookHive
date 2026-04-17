import type { Book } from "@types";
import { Link } from "react-router";

type BookRowProps = {
  index: number;
  book: Book;
  onDelete: () => void;
};

const BookRow = ({ index, book, onDelete }: BookRowProps) => {
  return (
    <tr>
      <th>{index}</th>
      <td>
        <div className="flex items-center gap-3">
          {book.image && (
            <div className="mask w-24">
              <img src={book.image} alt={book.title} />
            </div>
          )}
          <div>
            <div className="font-bold">{book.title}</div>
            <div className="text-sm opacity-50">{book.author}</div>
          </div>
        </div>
      </td>
      <td>{book.publishedYear}</td>
      <th>
        <div className="flex justify-end gap-3">
          <Link to={`${book.id}/edit`} className="btn btn-warning btn-xs">
            edit
          </Link>
          <button onClick={onDelete} className="btn btn-error btn-xs">
            delete
          </button>
        </div>
      </th>
    </tr>
  );
};

export default BookRow;
