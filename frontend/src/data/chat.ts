import { socket } from "@/components/chat/socket";
import { API_URL } from "@config";
import type { MessageResponse } from "@types";

type ChatResponse = {
  error?: string;
  success?: boolean;
};

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

export const sendMessageViaSocket = async (
  clubId: string,
  text: string,
): Promise<void> => {
  if (!socket.connected) {
    throw new Error("No internet connection to live chat.");
  }

  const response: ChatResponse = await socket.emitWithAck("message", {
    clubId,
    text,
  });

  if (response && response.success === false) {
    throw new Error(response.error || "Please check your input.");
  }
};
