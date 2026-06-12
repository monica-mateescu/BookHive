import { sendMessageViaSocket } from "@/data/chat";
import type { Chat } from "@types";
import { useState } from "react";

function ChatForm({ chatId, isConnected }: Chat) {
  const [message, setMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = message.trim().length > 0 && isConnected && !submitting;

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit || submitting) return;

    setError(null);
    setSubmitting(true);

    try {
      await sendMessageViaSocket(chatId, message);
      setMessage("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSubmit) {
        const form = e.currentTarget.form;
        if (form) form.requestSubmit();
      }
    }
  };

  const buttonClass =
    !canSubmit || submitting
      ? "absolute right-5 inset-y-0 my-auto h-fit text-(--gray-primary) cursor-not-allowed transition-colors"
      : "absolute right-5 inset-y-0 my-auto h-fit text-(--brand-primary) hover:text-(--brand-secondary) focus:text-(--brand-secondary) cursor-pointer transition-colors";

  return (
    <form
      onSubmit={onSubmit}
      className="mt-2 w-full rounded shadow-[0_2px_5px_rgba(0,0,0,0.5)]"
    >
      {error && (
        <div role="alert" className="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="relative">
        <div>
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="textarea textarea-bordered max-h-24 min-h-24 w-full resize-none"
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            required
            disabled={submitting}
          />
        </div>
        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className={buttonClass}
          aria-label="Send message"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M1 8H15M15 8L8 1M15 8L8 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default ChatForm;
