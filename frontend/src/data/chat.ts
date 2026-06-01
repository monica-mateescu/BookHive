import { API_URL } from "@config";
import type { MessageResponse } from "@types";

export const getMessagesByClubId = async (
  clubId: string,
): Promise<MessageResponse[]> => {
  const res = await fetch(`${API_URL}/api/chat/${clubId}/messages`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error.message || "Failed to load messages");
  }

  const data: MessageResponse[] = await res.json();
  return data;
};
