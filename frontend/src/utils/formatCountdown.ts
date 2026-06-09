export const formatCountdown = (c: {
  days: number;
  hours: number;
  minutes: number;
  isPast: boolean;
}) => {
  if (c.isPast) return "Started";

  if (c.days > 0) return `in ${c.days}d ${c.hours}h`;
  if (c.hours > 0) return `in ${c.hours}h ${c.minutes}m`;

  return `in ${c.minutes}m`;
};
