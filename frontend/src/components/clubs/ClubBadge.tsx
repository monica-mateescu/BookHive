type ClubBadgeProps = {
  meetingDate: string;
  durationMinutes: number;
};

const ClubBadge = ({ meetingDate, durationMinutes }: ClubBadgeProps) => {
  const now = new Date();
  const start = new Date(meetingDate);

  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  const isUpcoming = now < start;
  const isOngoing = now >= start && now <= end;

  return (
    <>
      {isUpcoming ? (
        <span className="badge-club badge-club-upcoming">Upcoming</span>
      ) : (
        isOngoing && <span className="badge-club badge-club-live">Ongoing</span>
      )}
    </>
  );
};

export default ClubBadge;
