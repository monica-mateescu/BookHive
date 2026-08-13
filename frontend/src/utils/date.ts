export const formatDate = (date: string) => new Date(date).toLocaleDateString();

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const localInputToUTC = (localDateTimeString: string): string | null => {
  if (!localDateTimeString) return null;
  return new Date(localDateTimeString).toISOString();
};

export const utcToLocalInput = (utcDateString: string): string => {
  return new Date(utcDateString)
    .toLocaleString("sv-SE")
    .replace(" ", "T")
    .substring(0, 16);
};
