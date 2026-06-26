import useAuth from "@/contexts/useAuth";
import type { Club } from "@/types";
import { isUserRef } from "@/utils";

import { Button, ButtonLink } from "../ui";
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
      <div>
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
      <p className="list-col-wrap text-xs">
        <MembersBadge
          current={club.members.length}
          max={club.maxMembers ?? 0}
        />
      </p>
      {club.status === "approved" ? (
        <ButtonLink to={`/clubs/${club.slug}`} className="btn btn-sm">
          View club
        </ButtonLink>
      ) : (
        <Button variant="secondary" disabled className="btn-sm">
          View club
        </Button>
      )}
    </li>
  );
};

export default MyClubCard;
