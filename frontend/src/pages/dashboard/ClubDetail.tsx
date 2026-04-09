import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router";

import {
  ClubMeetingCard,
  ClubMembers,
  ClubSidebar,
  ConfirmModal,
  Loading,
} from "../../components";
import { deleteClubById, getClubById } from "../../data/clubs";
import type { Club } from "../../types/club";
import { formatDate } from "../../utils";

const ClubDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isDeleting, setIsDeleting] = useState(false);
  const { data, isLoading, isError, error } = useQuery<Club>({
    queryKey: ["club", id],
    queryFn: () => getClubById(id!),
    enabled: Boolean(id),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteClubById(id),
    onSuccess: () => {
      setIsDeleting(false);
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <Loading />;
  if (isError) return <div className="alert alert-error">{error.message}</div>;
  if (!data) return <div className="text-sm font-semibold">Club not found</div>;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">{data.name}</h1>
      <p className="text-gray-500">{data.description}</p>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        <span className="badge badge-outline">
          📚 {typeof data.bookId !== "string" ? data.bookId.title : data.bookId}
        </span>
        <span className="badge badge-outline">
          📅 {formatDate(data.meetingDate)}
        </span>
        <span className="badge badge-outline">
          👥 {data.members.length} / {data.maxMembers}
        </span>
      </div>
      <div className="divider"></div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ClubMeetingCard
            meetingDate={data.meetingDate}
            meetingLink={data.meetingLink}
          />

          <ClubMembers members={data.members} />
        </div>
        <ClubSidebar
          createdBy={data.createdBy}
          createdDate={data.createdAt}
          updatedDate={data.updatedAt}
        />
      </div>
      <div className="flex justify-end gap-3">
        <Link
          to={`/dashboard/clubs/${id}/edit`}
          className="btn btn-warning btn-sm"
        >
          edit
        </Link>
        <button
          onClick={() => setIsDeleting(true)}
          className="btn btn-error btn-sm"
        >
          delete
        </button>
      </div>
      {isDeleting && (
        <ConfirmModal
          title={data.name}
          message="Are you sure you want to delete this club?"
          onConfirm={() => handleDelete(id!)}
          onClose={() => setIsDeleting(false)}
          isLoading={deleteMutation.isPending}
        />
      )}
    </div>
  );
};

export default ClubDetail;
