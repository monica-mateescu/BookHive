import { getMessagesByClubId } from "@data";
import {
  type InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { Chat, MessageCursorResponse, MessageResponse } from "@types";
import { authClient } from "@utils";
import { useEffect, useRef } from "react";

import { InfoState } from "../ui";
import { socket } from "./socket";

export function ChatMessages({ chatId, isConnected }: Chat) {
  const queryClient = useQueryClient();
  const cursorRef = useRef<HTMLDivElement>(null);
  const { data: session } = authClient.useSession();

  const {
    data,
    error,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<MessageCursorResponse, Error>({
    queryKey: ["messages", chatId],
    queryFn: async ({ pageParam }) => {
      return getMessagesByClubId(chatId, pageParam as string);
    },
    initialPageParam: undefined,
    enabled: !!chatId,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const pages = data?.pages ?? [];
  const messages = [...pages].reverse().flatMap((page) => page.data);

  useEffect(() => {
    if (isLoading || isError) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          hasNextPage &&
          !isFetchingNextPage &&
          entries[0].rootBounds &&
          entries[0]?.isIntersecting
        ) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px 0px 0px 0px",
      },
    );

    const currentCursor = cursorRef.current;
    if (currentCursor) {
      observer.observe(currentCursor);
    }

    return () => {
      if (currentCursor) {
        observer.unobserve(currentCursor);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, isLoading, isError]);

  useEffect(() => {
    if (!chatId || !isConnected) return;

    socket.emit("join", { clubId: chatId });

    function onNewMessage(newMessage: MessageResponse) {
      if (newMessage.clubId === chatId) {
        queryClient.setQueryData<InfiniteData<MessageCursorResponse>>(
          ["messages", chatId],
          (oldData) => {
            if (!oldData) return oldData;

            const updatedPages = [...oldData.pages];
            if (updatedPages[0]) {
              updatedPages[0] = {
                ...updatedPages[0],
                data: [...updatedPages[0].data, newMessage],
              };
            }

            return {
              ...oldData,
              pages: updatedPages,
            };
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

  if (!isConnected) return <InfoState message="Connecting ..." />;

  if (isLoading) return <InfoState message="Loading messages ..." />;

  if (messages.length === 0)
    return (
      <InfoState message="No messages received yet. Be the first to write something!" />
    );

  return (
    <>
      {messages.length > 0 && (
        <ul className="mb-2 flex flex-1 list-none flex-col space-y-2 bg-(--bg-main) text-(--text-main)">
          <li>
            <div ref={cursorRef} className="h-1 w-full" />
          </li>

          {isFetchingNextPage && (
            <li className="rounded-2xl bg-(--gray-secondary) px-5 py-2 text-(--text-main)">
              Loading older messages...
            </li>
          )}

          {messages.map((message, index) => {
            const isMyMessage = session?.user?.id
              ? message.senderId.id === session.user.id
              : false;

            const name = isMyMessage
              ? session?.user?.name
              : `${message.senderId.firstName}`;

            return (
              <li
                key={`${message.id}-${index}`}
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
    </>
  );
}

export default ChatMessages;
