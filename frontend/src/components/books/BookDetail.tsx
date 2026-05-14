import useAuth from "@/contexts/useAuth";
import type { Book } from "@/types";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { InfoState } from "../ui";

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
          <div
            role="alert"
            className="alert alert-vertical sm:alert-horizontal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info h-6 w-6 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            {book.club ? (
              <>
                <div>
                  <h3 className="font-bold">{book.club.name}</h3>
                  <div className="text-xs">
                    This book is already being read in the club.
                  </div>
                </div>
                <Link
                  to={`/clubs/${book.club.id}`}
                  className="btn btn-sm btn-primary btn-brand-primary"
                >
                  View club
                </Link>
              </>
            ) : (
              <>
                <div>
                  <h3 className="font-bold">
                    You can create a new club for this book
                  </h3>
                  <div className="text-xs">
                    This book is not currently being read in any club.
                  </div>
                </div>
                <button
                  onClick={handleCreateClick}
                  className="btn btn-sm btn-primary btn-brand-primary"
                >
                  Create club
                </button>
              </>
            )}
          </div>
          {error && (
            <InfoState message="You have to be logged in to create a club." />
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
