import { socket } from "@/components/chat/socket";
import { useEffect, useState } from "react";

import ChatForm from "./ChatForm";
import ChatMessages from "./ChatMessages";

interface ChatProps {
  clubId: string;
}

export function Chat({ clubId }: ChatProps) {
  const [isChatActive, setIsChatActive] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
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
  }, []);

  const toggleChat = () => {
    if (isChatActive) {
      socket.disconnect();
      setIsChatActive(false);
    } else {
      socket.connect();
      setIsChatActive(true);
    }
  };

  return (
    <>
      <div className="px-5 md:pr-5 md:pl-0">
        <div
          className="my-5 flex cursor-pointer items-center gap-5 select-none"
          onClick={toggleChat}
        >
          <h3 className="text-xl font-semibold text-(--brand-primary)">
            {isChatActive ? "Live-Chat" : "Live-Chat"}
          </h3>
          <div className="h-1 flex-1 bg-(--brand-primary)"></div>
          <span className="text-(--brand-primary) transition-transform duration-200">
            {isChatActive ? "▲" : "▼"}
          </span>
        </div>

        {isChatActive && (
          <>
            <ChatMessages
              key={clubId}
              chatId={clubId}
              isConnected={isConnected}
            />
            <ChatForm chatId={clubId} isConnected={isConnected} />
          </>
        )}
      </div>
    </>
  );
}

export default Chat;
