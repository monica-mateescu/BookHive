import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import {
  ClubMeetingCard,
  ClubMembers,
  ClubSidebar,
  Loading,
} from "../../components";
import { getClubById } from "../../data/clubs";
import type { Club } from "../../types/club";
import { formatDate } from "../../utils";

const ClubDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useQuery<Club>({
    queryKey: ["club", id],
    queryFn: () => getClubById(id as string),
    enabled: Boolean(id),
  });

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
    </div>
  );
};

export default ClubDetail;
