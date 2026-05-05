import useAuth from "@contexts/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { joinClub, leaveClub } from "../../data/clubs";
import type { Club } from "../../types/club";
import ClubHeader from "./ClubHeader";
import MeetingDetailsCard from "./MeetingDetailsCard";

type ClubDetailProps = {
  club: Club;
};

function ClubDetail({ club }: ClubDetailProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");
  const userId = user?.id;

  // Check if the user is already a member of the club
  const isAlreadyMember = club.members.some((m) => {
    const memberId = typeof m.userId === "object" ? m.userId.id : m.userId;
    return memberId === userId;
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      isAlreadyMember ? leaveClub(club.id) : joinClub(club.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
      setErrorMessage("");
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
    },
  });

  const isAlreadyFull =
    !isAlreadyMember && club.maxMembers
      ? club.members.length >= club.maxMembers
      : false;

  const isJoinDisabled = isPending || (isAlreadyFull && !isAlreadyMember);

  const bookImage =
    typeof club.bookId === "object" && club.bookId !== null
      ? club.bookId.image
      : "default-cover.png";

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
      <div className="relative h-64 w-full md:col-span-2 md:h-auto">
        <img
          src={bookImage}
          alt={club.name ?? "Book cover"}
          className="h-full w-full object-contain md:object-cover"
        />
      </div>

      <div className="flex flex-col p-5 md:col-span-4">
        <div className="grow space-y-5">
          <ClubHeader
            club={club}
            isDisabled={isJoinDisabled}
            errorMessage={errorMessage}
            isMember={isAlreadyMember}
            onJoinToggle={mutate}
          />
          <MeetingDetailsCard
            meetingDate={club.meetingDate}
            meetingLink={club.meetingLink}
            isMember={isAlreadyMember}
          />
        </div>
      </div>
    </div>
  );
}

export default ClubDetail;
