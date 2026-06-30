import { isBookRef } from "@/utils";
import useAuth from "@contexts/useAuth";
import { joinClub, leaveClub } from "@data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Club } from "@types";
import { useState } from "react";
import { Link } from "react-router";

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
  const initialMembership = club.members.some((m) => {
    const memberId = typeof m.userId === "object" ? m.userId.id : m.userId;
    return memberId === userId;
  });
  const [isMember, setIsMember] = useState(initialMembership);
  const [membersCount, setMembersCount] = useState(club.members.length);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ action }: { action: "join" | "leave" }) =>
      action === "leave" ? leaveClub(club.id) : joinClub(club.id),

    onSuccess: (_, variables) => {
      const joining = variables.action === "join";

      setIsMember(joining);
      setMembersCount((prev) => (joining ? prev + 1 : prev - 1));

      queryClient.invalidateQueries({ queryKey: ["clubs"] });
      setErrorMessage("");
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
    },
  });

  const handleToggle = () => {
    if (!user) {
      setErrorMessage("You have to be logged in to join a club.");
      return;
    }

    mutate({
      action: isMember ? "leave" : "join",
    });
  };

  const isAlreadyFull =
    !isMember && club.maxMembers
      ? club.members.length >= club.maxMembers
      : false;

  const isJoinDisabled = isPending || (isAlreadyFull && !isMember);

  const bookImage =
    isBookRef(club.bookId) && club.bookId.image
      ? club.bookId.image
      : "../assets/images/books/default-cover.png";

  const bookSlug =
    isBookRef(club.bookId) && club.bookId.slug ? club.bookId.slug : "";

  const isPast = new Date(club.meetingDate) < new Date();

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
      <Link
        to={`/books/${bookSlug}`}
        className="relative h-64 w-full md:col-span-2 lg:h-auto"
      >
        <img
          src={bookImage}
          alt={club.name ?? "Book cover"}
          className="h-full w-full object-contain lg:h-auto lg:object-cover"
        />
      </Link>

      <div className="flex flex-col p-5 md:col-span-4">
        <div className="grow space-y-5">
          <ClubHeader
            club={club}
            membersCount={membersCount}
            isDisabled={isJoinDisabled}
            errorMessage={errorMessage}
            isMember={isMember}
            authUserId={userId}
            isPast={isPast}
            onJoinToggle={handleToggle}
          />
          <MeetingDetailsCard
            meetingDate={club.meetingDate}
            meetingLink={club.meetingLink}
            isMember={isMember}
            isPast={isPast}
          />
        </div>
      </div>
    </div>
  );
}

export default ClubDetail;
