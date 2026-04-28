import { isBookRef } from "@/utils";
import type { Club } from "@types";
import { Link } from "react-router";

import Button from "../ui/Button";

type ClubCardProps = {
  club: Club;
};

function ClubCard({ club }: ClubCardProps) {
  const bookImage =
    isBookRef(club.bookId) && club.bookId.image
      ? club.bookId.image
      : "src/assets/images/books/default-cover.png";

  const bookTitle = isBookRef(club.bookId) ? club.bookId.title : "Unknown Book";

  return (
    <Link to={`/clubs/${club.id}/detail`}>
      <div className="flex flex-col rounded-lg bg-(--bg-main) p-4 shadow-md">
        <div className="mb-2 h-44">
          <img
            src="src/assets/images/clubs/bc-3.png"
            alt={club.name}
            className="h-full w-full object-cover"
          />
        </div>

        <h3 className="mb-1 text-sm font-semibold">{club.name}</h3>

        <div className="flex items-stretch gap-3 text-(--brand-secondary)">
          <div className="h-24 shrink-0">
            <img
              src={bookImage}
              alt={bookTitle}
              className="h-full w-auto object-cover"
            />
          </div>

          <div className="flex h-24 flex-1 flex-col">
            <div className="flex flex-1 flex-col justify-center text-xs">
              <h3 className="font-medium">{bookTitle}</h3>
              <span>Members: {club.members.length}</span>
            </div>

            <div className="flex justify-end">
              <Button> More details</Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ClubCard;
