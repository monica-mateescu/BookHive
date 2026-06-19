import type { Club } from "@/types";
import { isUserRef } from "@/utils";

import { Button, InfoState } from "../ui";
import MembersBadge from "./MembersBadge";

type ClubHeaderProps = {
  club: Club;
  errorMessage: string;
  isDisabled: boolean;
  isMember: boolean;
  authUserId?: string;
  onJoinToggle: () => void;
};

const ClubHeader = ({
  club,
  errorMessage,
  isDisabled,
  isMember,
  authUserId,
  onJoinToggle,
}: ClubHeaderProps) => {
  const ownerId = isUserRef(club.createdBy)
    ? `${club.createdBy.id}`
    : club.createdBy;
  const isOwner = authUserId === ownerId;

  return (
    <header className="space-y-5">
      <h1 className="text-2xl font-semibold">{club.name}</h1>
      <p className="text-(--gray-primary)">{club.description}</p>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <MembersBadge
          current={club.members.length}
          max={club.maxMembers ?? 0}
        />

        {!isOwner && (
          <Button
            onClick={onJoinToggle}
            disabled={isDisabled}
            variant={isMember ? "neutral" : "primary"}
          >
            {isMember ? "Leave club" : "Join club"}
          </Button>
        )}
      </div>
      {errorMessage && <InfoState message={errorMessage} />}
    </header>
  );
};

export default ClubHeader;
