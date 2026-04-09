import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import useAuth from "../contexts/useAuth";
import { joinClub, leaveClub } from "../data/clubs";
import type { Club } from "../types/club";

type ClubCardProps = {
  index: number;
  club: Club;
};

function ClubCard({ index, club }: ClubCardProps) {
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

  const bookImage =
    typeof club.bookId === "object" && club.bookId !== null
      ? club.bookId.image
      : "default-cover.png";

  return (
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

      <div className="flex grow flex-col gap-2 p-4">
        <h3>{club.name}</h3>
        <div className="flex items-center justify-between text-xs text-gray-500">
          {club.members.length} / {club.maxMembers} members
        </div>

        {errorMessage && (
          <p className="text-[10px] font-medium text-red-600">{errorMessage}</p>
        )}

        <button
          onClick={() => mutate()}
          disabled={isPending || (!isAlreadyMember && isAlreadyFull)}
          className={`mt-auto w-full cursor-pointer rounded-xl py-2 text-sm font-semibold transition-all active:scale-95 ${
            isAlreadyMember
              ? "bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-200 disabled:text-gray-400"
              : "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400"
          }`}
        >
          {isPending
            ? "Updating..."
            : isAlreadyMember
              ? "Leave club"
              : isAlreadyFull
                ? "Full"
                : "Join club"}
        </button>
      </div>
    </div>
  );
}

export default ClubCard;
