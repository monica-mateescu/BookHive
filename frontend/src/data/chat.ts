import { API_URL } from "@config";
import type { MessagesResponse } from "@types";

export const getMessagesByClubId = async (
  clubId: string,
): Promise<MessagesResponse[]> => {
  const res = await fetch(`${API_URL}/api/chat/${clubId}/messages`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error.message || "Failed to load messages");
  }

  const data: MessagesResponse[] = await res.json();
  return data;
};
