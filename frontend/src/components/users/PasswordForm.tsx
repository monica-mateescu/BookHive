import { authClient } from "@/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { ErrorAlert, SuccessAlert } from "../ui";

const PasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) return;

    setError(null);
    setSuccess(null);
    setSubmitting(true);

    const { error } = await authClient.changePassword({
      newPassword,
      currentPassword,
      revokeOtherSessions: true,
    });

    if (error) {
      setError(error.message || "Failed to update password.");
    } else {
      setSuccess("Password updated successfully.");
    }

    setSubmitting(false);
  };

  const disabled = !currentPassword || !newPassword;

  const buttonClass =
    disabled || submitting
      ? "btn btn-disabled w-full"
      : "btn btn-primary btn-brand-primary w-full cursor-pointer";

  return (
    <>
      {error && <ErrorAlert message={error} />}
      {success && <SuccessAlert message={success} />}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative w-full">
          <label htmlFor="password" className="sr-only">
            Current Password
          </label>

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Current Password*"
            onChange={(e) => setCurrentPassword(e.target.value.trim())}
            className="input input-bordered w-full"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative w-full">
          <label htmlFor="password" className="sr-only">
            New Password
          </label>
          <input
            id="new-password"
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password*"
            onChange={(e) => setNewPassword(e.target.value.trim())}
            className="input input-bordered w-full"
            required
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute top-1/2 right-2 -translate-y-1/2"
          >
            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          className={buttonClass}
          disabled={disabled || submitting}
        >
          {submitting ? "Updating... " : "Change Password"}
        </button>
      </form>
    </>
  );
};

export default PasswordForm;
