import type { Book } from "@/types";
import { Link } from "react-router";

import Button from "../ui/Button";

type BookCardProps = {
  book: Book;
};

function BookCard({ book }: BookCardProps) {
  const bookImage =
    typeof book === "object" && book !== null
      ? book.image
      : "default-cover.png";

  return (
    <Link to={`/books/${book.id}/detail`}>
      <div className="flex h-full flex-col rounded-lg bg-(--bg-main)/80 p-5 shadow-lg ring-1 ring-black/5 backdrop-blur-sm transition hover:shadow-xl">
        <div className="relative mb-2 h-56 overflow-hidden">
          <img
            src={bookImage}
            alt={book.title}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex grow flex-col gap-3 rounded-lg text-center">
          <h2 className="mb-1 text-sm font-semibold">{book.title}</h2>
          <Button className="mt-auto"> Create a club</Button>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;
