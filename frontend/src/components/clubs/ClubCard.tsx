import type { Club } from "@types";
import { Link } from "react-router";

type ClubCardProps = {
  index: number;
  club: Club;
};

function ClubCard({ index, club }: ClubCardProps) {
  const bookImage =
    typeof club.bookId === "object" && club.bookId !== null
      ? club.bookId.image
      : "default-cover.png";

  return (
    <Link to={`/clubs/${club.id}/detail`}>
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md">
        <div className="relative aspect-3/4 overflow-hidden">
          <img
            src={bookImage}
            alt={club.name}
            className="h-full w-full object-cover transition-transform hover:scale-110"
          />
          <div className="absolute top-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
            Book club {index}
          </div>
        </div>

        <div className="flex grow flex-col gap-3 p-5">
          <h3>{club.name}</h3>
          <div className="flex items-center justify-between text-xs text-gray-500">
            {club.members.length} / {club.maxMembers} members
          </div>
          <span className="hover:underline">More details</span>
        </div>
      </div>
    </Link>
  );
}

export default ClubCard;
