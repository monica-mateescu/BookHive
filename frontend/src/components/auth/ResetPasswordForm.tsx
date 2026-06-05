import { authClient } from "@/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import { ErrorAlert, SuccessAlert } from "../ui";

type ResetPasswordFormProps = {
  token: string | undefined;
};

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!newPassword) return;

    setError(null);
    setSuccess(null);
    setSubmitting(true);

    const { error } = await authClient.resetPassword({
      newPassword,
      token,
    });

    if (error) {
      setError(
        error.message || "Something went wrong. Failed to reset password.",
      );
    } else {
      setSuccess(
        "Password reset successfully. You can now sign in with your new password.",
      );

      setNewPassword("");
      setShowPassword(false);

      navigate("/signin");
    }

    setSubmitting(false);
  };

  const disabled = !newPassword || !token || submitting;

  const buttonClass = disabled
    ? "btn btn-disabled w-full"
    : "btn btn-primary btn-brand-primary w-full cursor-pointer";

  return (
    <>
      {error && <ErrorAlert message={error} />}
      {success && <SuccessAlert message={success} />}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative w-full">
          <label htmlFor="password" className="sr-only">
            New password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="New password*"
            onChange={(e) => setNewPassword(e.target.value.trim())}
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

        <button
          type="submit"
          className={buttonClass}
          disabled={disabled || submitting}
        >
          {submitting ? "Reseting..." : "Reset password"}
        </button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
