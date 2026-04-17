import useAuth from "@contexts/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

import { getClubs } from "../../data/clubs";
import type { Book } from "../../types/book";

type BookDetailProps = {
  book: Book;
};

function BookDetail({ book }: BookDetailProps) {
  const { user, isAdmin } = useAuth();

  const { data: clubsResponse, isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: () => getClubs(),
    enabled: !!user,
  });

  const existingClubs = clubsResponse?.data || [];

  const isBookInAnyClub = existingClubs.some((club) => {
    const clubBookId =
      typeof club.bookId === "object" && club.bookId !== null
        ? club.bookId.id
        : club.bookId;

    return clubBookId === book.id;
  });

  const isCreator = existingClubs.some((club) => {
    const clubBookId =
      typeof club.bookId === "object" && club.bookId !== null
        ? club.bookId.id
        : club.bookId;

    const creatorId =
      typeof club.createdBy === "object" && club.createdBy !== null
        ? club.createdBy.id
        : club.createdBy;

    return clubBookId === book.id && creatorId === user?.id;
  });

  const hideCreateButton = !isAdmin && (isBookInAnyClub || isCreator);

  return (
    <div className="mx-auto w-full px-[1em] md:w-[80%]">
      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border bg-white shadow-sm md:grid-cols-6">
        <div className="relative h-64 w-full md:col-span-2 md:h-full">
          <img
            src={book.image || "default-cover.png"}
            alt={book.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col p-8 md:col-span-4">
          <div className="grow space-y-5">
            <h1 className="text-2xl font-semibold">📚 {book.title}</h1>
            <p className="text-gray-500">Author: {book.author}</p>

            <div className="divider my-2"></div>

            <div className="card bg-base-100 w-full border shadow-sm">
              <div className="card-body p-2 sm:p-5">
                <h2 className="card-title text-md">Club Management</h2>

                {isLoading ? (
                  <div className="text-sm font-semibold">Loading...</div>
                ) : hideCreateButton ? (
                  <div className="alert alert-info border-blue-200 bg-blue-50 text-sm text-blue-800">
                    <span>
                      {isCreator
                        ? "You have already created a club for this book."
                        : "A club for this book already exists."}
                    </span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm">
                      No club exists for this book yet. Why not start one?
                    </p>
                    <Link
                      to={`/clubs/create/${book.id}`}
                      className="btn btn-primary"
                    >
                      Create new club
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
