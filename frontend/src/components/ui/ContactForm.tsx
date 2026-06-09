import { TURNSTILE_SITE_KEY } from "@/config";
import { sendContactMessage } from "@/data";
import type { ContactForm } from "@types";
import { type ChangeEvent, useEffect, useRef, useState } from "react";

import { EmptyState } from "..";

const initialForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<ContactForm>(initialForm);

  const widgetId = useRef<string | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;

    // Clean up any existing widget instance
    if (widgetId.current && window.turnstile) {
      window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    }

    // Ensure the target DOM element exists
    if (!widgetRef.current) return;

    // Initialize and mount the widget
    const renderWidget = () => {
      // Prevent duplicate rendering
      if (widgetId.current) return;

      // Render the widget and save its unique instance ID
      if (window.turnstile && widgetRef.current) {
        widgetId.current = window.turnstile.render(widgetRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          // Handle successful verification
          callback: (token: string) => {
            setTurnstileToken(token);
            setError("");
          },
          // Handle verification errors
          "error-callback": () => {
            setError("Cloudflare security error. Please reload the page.");
            setTurnstileToken("");
          },
          // Handle token timeouts
          "expired-callback": () => {
            setError("Security token expired. Please try to verify again.");
            setTurnstileToken("");
          },
          theme: "light",
          size: window.innerWidth < 380 ? "compact" : "normal",
        });
      }
    };

    // Initialize if the script is already loaded
    if (window.turnstile) {
      renderWidget();
    } else {
      // Wait for the script tag to finish loading
      const script = document.querySelector(
        'script[src*="turnstile/v0/api.js"]',
      );
      if (script) {
        script.addEventListener("load", renderWidget);
      }
    }

    // Cleanup automatically when the component unmounts
    return () => {
      const script = document.querySelector(
        'script[src*="turnstile/v0/api.js"]',
      );
      // Remove event listener to free up browser memory
      if (script) {
        script.removeEventListener("load", renderWidget);
      }
      // Destroy the widget instance from browser memory
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, []);

  const setField = <K extends keyof ContactForm>(
    key: K,
    value: ContactForm[K],
  ) => setForm((p) => ({ ...p, [key]: value }));

  const onText =
    (key: keyof ContactForm) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const value = e.target.value;

      setField(key, value as ContactForm[typeof key]);
    };

  const canSubmit =
    form.name.trim() &&
    form.email.trim() &&
    form.subject.trim() &&
    form.message.trim();

  const buttonClass =
    !canSubmit || submitting || !turnstileToken
      ? "btn btn-disabled w-full"
      : "btn btn-primary btn-brand-primary w-full cursor-pointer";

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!turnstileToken) {
      setError("Please complete the security check.");
      return;
    }

    try {
      setSubmitting(true);

      await sendContactMessage({ ...form, turnstileToken });

      setSuccess("Thank you! Your message has been sent.");
      setForm(initialForm);

      if (widgetId.current && window.turnstile) {
        window.turnstile.reset(widgetId.current);
      }
      setTurnstileToken("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to send a message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="my-5 w-full">
      <div className="mx-auto w-full max-w-xl">
        {error && (
          <div role="alert" className="alert alert-error mb-5">
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

        {success && (
          <div role="alert" className="alert alert-success mb-5">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{success}</span>
          </div>
        )}

        {TURNSTILE_SITE_KEY ? (
          <form onSubmit={onSubmit}>
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Name*"
                  value={form.name}
                  onChange={onText("name")}
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Email*"
                  value={form.email}
                  onChange={onText("email")}
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label htmlFor="subject" className="sr-only">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="select select-bordered w-full"
                  value={form.subject}
                  onChange={onText("subject")}
                  required
                  disabled={submitting}
                >
                  <option value="" disabled>
                    Please select a subject
                  </option>
                  <option value="feedback">Feedback / idea</option>
                  <option value="technical">Technical issue</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="textarea textarea-bordered w-full"
                  placeholder="Your message*"
                  value={form.message}
                  onChange={onText("message")}
                  required
                  disabled={submitting}
                />
              </div>

              <div className="mt-5 flex max-w-full justify-center overflow-hidden px-2">
                <div
                  className="flex max-w-full justify-center"
                  ref={widgetRef}
                ></div>
              </div>

              <div className="mt-5 flex justify-center">
                <button
                  type="submit"
                  disabled={!canSubmit || submitting || !turnstileToken}
                  className={buttonClass}
                >
                  {submitting ? "Sending..." : "Send message"}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <EmptyState message="The contact form is currently deactivated. Please try again later." />
        )}
      </div>
    </div>
  );
}
