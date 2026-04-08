import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { Loading } from "../../components";
import { getClubById } from "../../data/clubs";
import type { Club } from "../../types/club";

const formatDate = (date: string) => new Date(date).toLocaleDateString();

const isPopulatedUser = (
  value: string | { id: string; firstName: string; lastName: string },
): value is { id: string; firstName: string; lastName: string } =>
  typeof value !== "string";

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
    <article className="p-5">
      <h1 className="mb-4 text-2xl font-bold">{data.name}</h1>
      <p className="mb-2">
        <strong>Description: </strong> {data.description}
      </p>
      <p className="mb-2">
        <strong>Meeting Link: </strong>{" "}
        <a
          href={data.meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {data.meetingLink}
        </a>
      </p>
      <p className="mb-2">
        <strong>Meeting Date: </strong>
        {formatDate(data.meetingDate)}
      </p>
      <p className="mb-2">
        <strong>Updated Date: </strong>
        {formatDate(data.updatedAt)}
      </p>
      <p className="mb-2">
        <strong>Created Date: </strong>
        {formatDate(data.createdAt)}
      </p>
      <p className="mb-2">
        <strong>Created by: </strong>
        {isPopulatedUser(data.createdBy)
          ? `${data.createdBy.firstName} ${data.createdBy.lastName}`
          : data.createdBy}
      </p>
      <p className="mb-2">
        <strong>Book: </strong>
        {typeof data.bookId !== "string"
          ? `${data.bookId.title} by ${data.bookId.author} (${data.bookId.publishedYear})`
          : data.bookId}
      </p>
      <p className="mb-2">
        <strong>Members: </strong>
        <ul>
          {data.members.length > 0
            ? data.members.map((member) => (
                <li
                  key={
                    isPopulatedUser(member.userId)
                      ? member.userId.id
                      : member.userId
                  }
                >
                  {isPopulatedUser(member.userId)
                    ? `${member.userId.firstName} ${member.userId.lastName}`
                    : member.userId}
                  ({member.role})
                </li>
              ))
            : "No members"}
        </ul>
      </p>
    </article>
  );
};

export default ClubDetail;
