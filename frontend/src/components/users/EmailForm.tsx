import { BASE_APP_URL } from "@/config";
import useAuth from "@/contexts/useAuth";
import { authClient } from "@/utils";
import { useState } from "react";

import { ErrorAlert, SuccessAlert } from "../ui";

const EmailForm = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || "");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!email) return;

    setError(null);
    setSuccess(null);
    setSubmitting(true);

    const { error } = await authClient.changeEmail({
      newEmail: email,
      callbackURL: `${BASE_APP_URL}/email-verified`,
    });

    if (error) {
      setError(error.message || "Failed to request email change.");
      setEmail(user?.email || "");
    } else {
      setSuccess("Verification email sent to your current address.");
    }

    setSubmitting(false);
  };

  const disabled = !email || email === user?.email;

  const buttonClass =
    disabled || submitting
      ? "btn btn-disabled w-full"
      : "btn btn-primary btn-brand-primary w-full cursor-pointer";
  return (
    <>
      {error && <ErrorAlert message={error} />}
      {success && <SuccessAlert message={success} />}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <button
          type="submit"
          className={buttonClass}
          disabled={disabled || submitting}
        >
          {submitting ? "Updating email..." : "Change email"}
        </button>
      </form>
    </>
  );
};

export default EmailForm;
