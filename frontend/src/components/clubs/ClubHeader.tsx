import type { Club } from "@/types";
import { Book } from "lucide-react";

import Button from "../ui/Button";
import MembersBadge from "./MembersBadge";

type ClubHeaderProps = {
  club: Club;
  errorMessage: string;
  isDisabled: boolean;
  isMember: boolean;
  onJoinToggle: () => void;
};

const ClubHeader = ({
  club,
  errorMessage,
  isDisabled,
  isMember,
  onJoinToggle,
}: ClubHeaderProps) => {
  return (
    <header className="space-y-5">
      <h1 className="flex items-center gap-2 text-2xl font-semibold">
        <Book />
        {club.name}
      </h1>
      <p className="text-(--gray-primary)">{club.description}</p>
      {errorMessage && (
        <p className="text-xs font-medium text-(--error)">{errorMessage}</p>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <MembersBadge
          current={club.members.length}
          max={club.maxMembers ?? 0}
        />

        <Button
          onClick={onJoinToggle}
          disabled={isDisabled}
          variant={isMember ? "neutral" : "primary"}
        >
          {isMember ? "Leave club" : "Join club"}
        </Button>
      </div>
    </header>
  );
};

export default ClubHeader;
