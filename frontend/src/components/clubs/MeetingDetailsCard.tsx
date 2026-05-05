import { formatDate, formatTime } from "@/utils";
import { Calendar, Clock, Video } from "lucide-react";

type MeetingDetailsCardProps = {
  meetingDate: string;
  meetingLink: string;
  isMember: boolean;
};
const MeetingDetailsCard = ({
  meetingDate,
  meetingLink,
  isMember,
}: MeetingDetailsCardProps) => {
  return (
    <div className="card rounded-lg bg-(--bg-main)/80 p-2 shadow-sm ring-1 ring-black/5 backdrop-blur-sm">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title text-md">Meeting Details</h2>
          <div className="flex gap-3 text-(--brand-primary)" aria-hidden="true">
            <Calendar />
            <Clock />
            <Video />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm">
            <strong>Date & Time:</strong>
            <span className="ml-1">
              {formatDate(meetingDate)} at {""}
              {formatTime(meetingDate)}
            </span>
          </p>
          {isMember && (
            <p className="text-sm break-all">
              <strong>Meeting Link:</strong>
              <a
                href={meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-(--brand-primary) hover:underline"
              >
                {meetingLink}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailsCard;
