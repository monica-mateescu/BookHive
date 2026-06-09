import { useCountdown } from "@/hooks";
import { formatCountdown, isBookRef } from "@/utils";
import type { Club } from "@types";
import { Calendar } from "lucide-react";
import { Link } from "react-router";

import clubImage from "../../assets/images/clubs/bc-3.png";
import Button from "../ui/Button";

type ClubCardProps = {
  club: Club;
  variant?: "upcoming" | "popular";
};

function ClubCard({ club, variant }: ClubCardProps) {
  const bookImage =
    isBookRef(club.bookId) && club.bookId.image
      ? club.bookId.image
      : club.book
        ? club.book.image
        : null;

  const bookTitle = isBookRef(club.bookId)
    ? club.bookId.title
    : club.book
      ? club.book.title
      : "Unknown Book";
  const countdown = useCountdown(club.meetingDate);

  return (
    <Link to={`/clubs/${club.id}`}>
      <div className="flex flex-col rounded-lg bg-(--bg-main)/80 shadow-lg ring-1 ring-black/5 backdrop-blur-sm transition hover:shadow-xl">
        <div className="h-44 overflow-hidden rounded-tl-lg rounded-tr-lg">
          <img
            src={club.image ?? clubImage}
            alt={club.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-5">
          <h2 className="mb-1 text-sm font-semibold">{club.name}</h2>
          <div className="flex items-stretch gap-3 text-(--brand-secondary)">
            {bookImage && (
              <div className="h-24 shrink-0">
                <img
                  src={bookImage}
                  alt={bookTitle}
                  className="h-full w-auto object-cover"
                />
              </div>
            )}

            <div className="flex h-24 flex-1 flex-col">
              <div className="flex flex-1 flex-col justify-center text-xs">
                <h3 className="font-medium">{bookTitle}</h3>
                <div className="mt-2 text-xs">
                  {variant === "popular" && (
                    <span>Members: {club.members.length}</span>
                  )}

                  {variant === "upcoming" && (
                    <span className="inline-flex items-center gap-1 text-(--brand-primary)">
                      <Calendar size={16} /> Starts {formatCountdown(countdown)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button> More details</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ClubCard;
