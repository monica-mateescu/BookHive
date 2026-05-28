import { type ChangeEvent, useMemo, useState } from "react";

import { socket } from "./socket";

interface ChatFormProps {
  chatId: string;
  isConnected: boolean;
}

interface ChatFormData {
  message: string;
}

interface ChatResponse {
  id?: string;
  text?: string;
  error?: string;
  success?: boolean;
  clubId?: string;
  senderId?: string;
  createdAt?: string;
  updatedAt?: string;
}

const initialForm: ChatFormData = { message: "" };

function ChatForm({ chatId, isConnected }: ChatFormProps) {
  const [form, setForm] = useState<ChatFormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const canSubmit = useMemo(() => {
    return form.message.trim().length > 0 && isConnected;
  }, [form, isConnected]);

  const onText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ message: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setError("");

    socket
      //.timeout(5000)
      .emit(
        "message",
        { clubId: chatId, text: form.message },
        (error: Error | null, response: ChatResponse | null) => {
          setSubmitting(false);

          if (error) {
            setError(error.message);
          } else if (response && response.success === false) {
            setError(response.error || "Please check your input.");
          } else {
            setForm(initialForm);
          }
        },
      );
  };

  const buttonClass =
    !canSubmit || submitting
      ? "btn btn-disabled w-full"
      : "btn btn-primary btn-brand-primary w-full cursor-pointer";

  return (
    <div className="mt-auto">
      <form onSubmit={handleSubmit} className="w-full">
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

        <div className="space-y-5">
          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="textarea textarea-bordered w-full"
              placeholder="Write a message..."
              value={form.message}
              onChange={onText}
              required
              disabled={submitting}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className={buttonClass}
          >
            {submitting ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatForm;
