import useAuth from "@/contexts/useAuth";
import { authClient } from "@/utils";
import { useState } from "react";

import { ErrorAlert, SuccessAlert } from "../ui";

const ProfileDetailsForm = () => {
  const { user } = useAuth();

  const [firstName, setFirstName] = useState(user?.name || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!firstName) return;

    setError(null);
    setSuccess(null);
    setSubmitting(true);

    const { error } = await authClient.updateUser({
      name: firstName,
      lastName,
    });

    if (error) {
      setError(error.message || "Failed to update profile.");
    } else {
      setSuccess("Profile updated successfully.");
    }

    setSubmitting(false);
  };

  const disabled = !firstName;

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
          <label htmlFor="firstName" className="sr-only">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="First name*"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value.trim())}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="lastName" className="sr-only">
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value.trim())}
            className="input input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          className={buttonClass}
          disabled={disabled || submitting}
        >
          {submitting ? "Saving changes..." : "Save changes"}
        </button>
      </form>
    </>
  );
};

export default ProfileDetailsForm;
