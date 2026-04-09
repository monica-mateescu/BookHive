import { formatDate } from "../../utils";

type ClubMeetingCardProps = {
  meetingDate: string;
  meetingLink: string;
};

const ClubMeetingCard = ({
  meetingDate,
  meetingLink,
}: ClubMeetingCardProps) => {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">Meeting Details</h2>
        <p>
          <strong>Date: </strong> {formatDate(meetingDate)}
        </p>
        <p>
          <strong>Meeting Link: </strong>
          <a
            href={meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {meetingLink}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ClubMeetingCard;
