import { useEffect, useState } from "react";

import { InfoState } from "../ui";
import { socket } from "./socket";

export interface DBMessage {
  id: string;
  text: string;
  clubId: string;
  senderId: string;
  createdAt: string;
  updatedAt: string;
}

interface ChatMessagesProps {
  chatId: string;
  isConnected: boolean;
}

export function ChatMessages({ chatId, isConnected }: ChatMessagesProps) {
  const [liveMessages, setLiveMessages] = useState<DBMessage[]>([]);

  useEffect(() => {
    if (!isConnected) return;

    socket.emit("join", { clubId: chatId });

    function onNewMessage(message: DBMessage) {
      if (message.clubId === chatId) {
        setLiveMessages((previous) => [...previous, message]);
      }
    }

    socket.on("message", onNewMessage);

    return () => {
      socket.off("message", onNewMessage);
    };
  }, [chatId, isConnected]); // Kein synchrones SetState mehr im Body!

  return (
    <div className="flex min-h-[300px] flex-1 flex-col">
      {!isConnected && <InfoState message="Connecting..." />}

      {isConnected && liveMessages.length === 0 && (
        <InfoState message="No messages received yet. Be the first to write something!" />
      )}

      {isConnected && liveMessages.length > 0 && (
        <ul className="my-5 flex-1 list-none space-y-2 bg-(--bg-main) text-(--text-main)">
          {liveMessages.map((message, index) => {
            const isEven = index % 2 === 0;

            return (
              <li
                key={message.id}
                className={`flex w-full flex-col ${isEven ? "items-start" : "items-end"}`}
              >
                <span className="text-(--text-primary)) mb-1 block px-1 text-[10px]">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>

                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-2 wrap-break-word ${
                    isEven
                      ? "rounded-tl-none border border-(--brand-primary) bg-(--bg-main) text-(--text-primary)"
                      : "rounded-tr-none border border-(--brand-primary) bg-(--bg-main) text-(--text-primary)"
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
