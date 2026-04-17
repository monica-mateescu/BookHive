import type { Book } from "@/types";
import { Link } from "react-router";

type BookCardProps = {
  index: number;
  book: Book;
};

function BookCard({ index, book }: BookCardProps) {
  const bookImage =
    typeof book === "object" && book !== null
      ? book.image
      : "default-cover.png";

  return (
    <Link to={`/books/${book.id}/detail`}>
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md">
        <div className="relative aspect-3/4 overflow-hidden">
          <img
            src={bookImage}
            alt={book.title}
            className="h-full w-full object-cover transition-transform hover:scale-110"
          />
          <div className="absolute top-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
            Book {index}
          </div>
        </div>

        <div className="flex grow flex-col gap-3 p-5">
          <h3>{book.title}</h3>
          <span className="hover:underline">More details</span>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;
