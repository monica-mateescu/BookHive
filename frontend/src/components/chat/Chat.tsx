import { socket } from "@/components/chat/socket";
import { authClient } from "@utils";
import { useEffect, useState } from "react";

import { EmptyState } from "..";
import ChatForm from "./ChatForm";
import ChatMessages from "./ChatMessages";

interface ChatProps {
  clubId: string;
}

export function Chat({ clubId }: ChatProps) {
  const { data: session } = authClient.useSession();
  const [isChatActive, setIsChatActive] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (!session) return;

    function handleConnect() {
      setIsConnected(true);
    }
    function handleDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.disconnect();
    };
  }, [session]);

  const toggleChat = () => {
    if (isChatActive) {
      socket.disconnect();
      setIsChatActive(false);
    } else {
      socket.connect();
      setIsChatActive(true);
    }
  };

  if (!session) {
    return (
      <>
        <br />
        <EmptyState message="Please sign in to use the chat feature." />
      </>
    );
  }

  return (
    <>
      <div className="px-5 md:pr-5 md:pl-0">
        <div
          className="my-5 flex cursor-pointer items-center gap-5 select-none"
          onClick={toggleChat}
        >
          <h3 className="text-xl font-semibold text-(--brand-primary)">
            Live-Chat
          </h3>
          <div className="h-1 flex-1 bg-(--brand-primary)"></div>
          <span className="text-(--brand-primary) transition-transform duration-200">
            {isChatActive ? "▲" : "▼"}
          </span>
        </div>

        {isChatActive && (
          <div className="relative flex flex-col rounded-xl bg-(--bg-main)">
            <div className="min-h-0">
              <ChatMessages
                key={clubId}
                chatId={clubId}
                isConnected={isConnected}
              />
            </div>
            <div className="sticky bottom-2 z-10 mt-2 bg-(--bg-main)/75">
              <ChatForm chatId={clubId} isConnected={isConnected} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Chat;
