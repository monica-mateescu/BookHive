import useAuth from "@/contexts/useAuth";
import type { Book } from "@/types";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

type BookDetailProps = {
  book: Book;
};

function BookDetail({ book }: BookDetailProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState<boolean>(false);

  const handleCreateClick = () => {
    if (!user) {
      setError(true);
      return;
    }

    navigate(`/clubs/create/${book.id}`);
  };

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
      <div className="relative h-64 w-full md:col-span-2 md:h-auto">
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-contain md:object-cover"
        />
      </div>

      <div className="flex flex-col p-5 md:col-span-4">
        <div className="grow space-y-5">
          <h1 className="text-2xl font-semibold">
            {book.title}
            <span className="block text-sm font-normal text-(--gray-primary)">
              {book.author}
            </span>
          </h1>
          <div className="text-(--gray-primary)">
            <h2 className="mb-2 text-lg font-semibold">Summary</h2>
            <p>{book.summary}</p>
          </div>
          <div className="card rounded-lg bg-(--bg-main)/80 p-2 shadow-sm ring-1 ring-black/5 backdrop-blur-sm">
            <div className="card-body">
              {book.club ? (
                <>
                  <p className="text-sm">
                    This book is already being read in the club{" "}
                    <span className="font-semibold">{book.club.name}</span>.
                  </p>

                  <div className="flex justify-end">
                    <Link
                      to={`/clubs/${book.club.id}`}
                      className="btn btn-sm btn-primary btn-brand-primary"
                    >
                      View club
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm">
                    This book is not currently being read in any club. You can
                    create a new club for this book.
                  </p>

                  <div className="flex justify-end">
                    <button
                      onClick={handleCreateClick}
                      className="btn btn-sm btn-primary btn-brand-primary"
                    >
                      Create new club
                    </button>
                  </div>
                  {error && (
                    <p className="text-right text-xs font-medium text-(--error)">
                      You have to be logged in to create a club.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
