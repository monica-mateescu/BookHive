import { authClient } from "@utils";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

function SignInForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    return email.trim() !== "" && password.trim() !== "";
  }, [email, password]);

  const buttonClass =
    !canSubmit || submitting
      ? "btn btn-disabled w-full"
      : "btn btn-primary btn-brand-primary w-full cursor-pointer";

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password: password,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "Login failed");
        return;
      }

      setSuccess("Login successful.");
      setTimeout(() => navigate("/"), 1000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
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

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
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
                disabled={submitting}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
                required
                disabled={submitting}
              />
              <Link
                to="/forgot-password"
                className="mt-2 inline-block text-(--brand-primary) no-underline hover:underline"
              >
                I forgot my password
              </Link>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              disabled={!canSubmit || submitting}
              className={buttonClass}
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        <div className="mt-5 text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-(--brand-primary) no-underline hover:underline"
          >
            Sign up!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
