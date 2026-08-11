import clubImage from "@/assets/images/clubs/default.png";
import { useCountdown } from "@/hooks";
import { formatCountdown, isBookRef } from "@/utils";
import type { Club } from "@types";
import { Calendar } from "lucide-react";
import { Link } from "react-router";

import Button from "../ui/Button";
import ClubBadge from "./ClubBadge";

type ClubCardProps = {
  club: Club;
  variant?: "upcoming" | "popular" | "default";
};

function ClubCard({ club, variant = "default" }: ClubCardProps) {
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
    <Link to={`/clubs/${club.slug}`}>
      <div className="flex flex-col rounded-lg bg-(--bg-card) shadow-lg ring-1 ring-(--border) backdrop-blur-sm transition hover:shadow-xl">
        <div className="relative overflow-hidden rounded-tl-lg rounded-tr-lg">
          <img
            src={club.image ?? clubImage}
            alt={club.name}
            className="w-full"
          />
          {variant === "default" && (
            <div className="absolute top-2 right-2">
              <ClubBadge
                meetingDate={club.meetingDate}
                durationMinutes={club.durationMinutes}
              />
            </div>
          )}
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
                  {(variant === "popular" || variant === "default") && (
                    <span>Members: {club.members.length}</span>
                  )}

                  {variant === "upcoming" && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={16} /> Starts {formatCountdown(countdown)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="btn-sm">More details</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ClubCard;
