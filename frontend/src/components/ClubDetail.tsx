import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import useAuth from "../contexts/useAuth";
import { joinClub, leaveClub } from "../data/clubs";
import type { Club } from "../types/club";
import { formatDate, formatTime } from "../utils/formatters";

type ClubChatProps = {
  club: Club;
};

function ClubDetail({ club }: ClubChatProps) {
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
    <>
      <div className="mx-auto w-full px-[1em] md:w-[80%]">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border bg-white shadow-sm md:grid-cols-6">
          <div className="relative h-64 w-full md:col-span-2 md:h-full">
            <img
              src={bookImage}
              alt={club.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col p-5 md:col-span-4">
            <div className="grow space-y-5">
              <h1 className="text-2xl font-semibold">📚 {club.name}</h1>
              <p className="text-gray-500">{club.description}</p>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <span className="badge badge-outline">
                  👥 {club.members.length} / {club.maxMembers}
                </span>
              </div>

              <div className="divider my-2"></div>

              <div className="card bg-base-100 w-full border shadow-sm">
                <div className="card-body p-2 sm:p-5">
                  <h2 className="card-title text-md">Meeting Details</h2>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <strong>Date & Time:</strong>
                      <span className="ml-1">
                        {formatDate(club.meetingDate)} at
                        {formatTime(club.meetingDate)}
                      </span>
                    </p>
                    <p className="text-sm break-all">
                      <strong>Meeting Link:</strong>
                      <a
                        href={club.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-blue-500 underline"
                      >
                        {club.meetingLink}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex justify-start">
                {errorMessage && (
                  <p className="text-xs font-medium text-red-600">
                    {errorMessage}
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => mutate()}
                  className={`btn btn-sm ${isAlreadyMember ? "btn-error" : "btn-primary"}`}
                  disabled={isPending || (!isAlreadyMember && isAlreadyFull)}
                >
                  {isAlreadyMember ? "Leave club" : "Join club"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClubDetail;
