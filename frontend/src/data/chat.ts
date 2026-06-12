import { socket } from "@/components/chat/socket";
import { API_URL } from "@config";
import type { MessageCursorResponse } from "@types";

type ChatResponse = {
  error?: string;
  success?: boolean;
};

export const getMessagesByClubId = async (
  clubId: string,
  cursor?: string,
): Promise<MessageCursorResponse> => {
  const url = !cursor
    ? `${API_URL}/api/chat/${clubId}/messages`
    : `${API_URL}/api/chat/${clubId}/messages?cursor=${cursor}`;

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error.message || "Failed to load messages");
  }

  return await res.json();
};

export const sendMessageViaSocket = async (
  clubId: string,
  text: string,
): Promise<void> => {
  if (!socket.connected) {
    console.warn("Socket disconnected, sending will retry automatically.");
  }

  const response: ChatResponse = await socket.emitWithAck("message", {
    clubId,
    text,
  });

  if (response && response.success === false) {
    throw new Error(response.error || "Please check your input.");
  }
};
