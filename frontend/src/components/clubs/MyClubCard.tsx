import useAuth from "@/contexts/useAuth";
import type { Club } from "@/types";
import { isUserRef } from "@/utils";

import { ButtonLink } from "../ui";
import MembersBadge from "./MembersBadge";

type ClubCardProps = {
  club: Club;
};

const MyClubCard = ({ club }: ClubCardProps) => {
  const { user } = useAuth();
  const ownerId = isUserRef(club.createdBy)
    ? `${club.createdBy.id}`
    : club.createdBy;
  const isOwner = user?.id === ownerId;
  return (
    <li className="list-row flex items-center justify-between gap-0 md:gap-3">
      <div className="min-w-0 flex-1">
        <h2 className="font-semibold">{club.name}</h2>
        <div className="text-xs uppercase">
          <span>{isOwner ? "Owner" : "Member"}</span>
          {isOwner && (
            <>
              {" "}
              |{" "}
              <span
                className={
                  club.status === "approved" ? "text-success" : "opacity-60"
                }
              >
                {club.status}
              </span>
            </>
          )}
        </div>
      </div>
      <p className="list-col-wrap shrink-0 text-xs">
        <MembersBadge
          current={club.members.length}
          max={club.maxMembers ?? 0}
        />
      </p>
      <ButtonLink to={`/clubs/${club.slug}`} className="btn btn-sm shrink-0">
        View club
      </ButtonLink>
    </li>
  );
};

export default MyClubCard;
