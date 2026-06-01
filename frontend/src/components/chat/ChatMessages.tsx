import { getMessagesByClubId } from "@data";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Chat, MessageResponse } from "@types";
import { authClient } from "@utils";
import { useEffect } from "react";

import { InfoState } from "../ui";
import { socket } from "./socket";

export function ChatMessages({ chatId, isConnected }: Chat) {
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();

  const {
    data: messages = [],
    isLoading,
    isError,
    error,
  } = useQuery<MessageResponse[], Error>({
    queryKey: ["messages", chatId],
    queryFn: () => getMessagesByClubId(chatId),
    enabled: !!chatId,
  });

  useEffect(() => {
    if (!chatId || !isConnected) return;

    socket.emit("join", { clubId: chatId });

    function onNewMessage(newMessage: MessageResponse) {
      if (newMessage.clubId === chatId) {
        queryClient.setQueryData<MessageResponse[]>(
          ["messages", chatId],
          (oldMessages) => {
            return oldMessages ? [newMessage, ...oldMessages] : [newMessage];
          },
        );
      }
    }

    socket.on("message", onNewMessage);

    return () => {
      socket.off("message", onNewMessage);
      socket.emit("leave", { clubId: chatId });
    };
  }, [chatId, isConnected, queryClient]);

  if (isError) return <InfoState message={error.message} />;

  if (isLoading) return <InfoState message="Loading messages ..." />;

  return (
    <div className="flex flex-1 flex-col">
      {!isConnected && <InfoState message="Connecting ..." />}

      {messages.length === 0 && (
        <InfoState message="No messages received yet. Be the first to write something!" />
      )}

      {messages.length > 0 && (
        <ul className="my-5 flex-1 list-none space-y-2 bg-(--bg-main) text-(--text-main)">
          {messages.map((message) => {
            const isMyMessage = session?.user?.id
              ? message.senderId.id === session.user.id
              : false;

            const name = isMyMessage
              ? session?.user?.name
              : `${message.senderId.firstName}`;

            return (
              <li
                key={message.id}
                className={`flex w-full flex-col ${isMyMessage ? "items-end" : "items-start"}`}
              >
                <div className="mb-2">
                  <b className="mr-2">{name}</b>
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                <div
                  className={`wrap-break-words w-[85%] rounded-2xl px-5 py-2 ${
                    isMyMessage
                      ? "rounded-tr-none bg-(--gray-secondary) text-(--text-main)"
                      : "rounded-tl-none bg-(--gray-secondary) text-(--text-main)"
                  }`}
                >
                  {message.text}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ChatMessages;
