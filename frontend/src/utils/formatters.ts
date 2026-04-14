export const formatDate = (date: string) => new Date(date).toLocaleDateString();

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
};
