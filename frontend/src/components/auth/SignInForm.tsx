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
    <div className="my-10 w-full">
      <div className="mx-auto w-full max-w-xl">
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
            {success}
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
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base transition-all outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-6"
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
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base transition-all outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-6"
                required
                disabled={submitting}
              />
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              disabled={!canSubmit || submitting}
              className="w-full max-w-xs cursor-pointer rounded-xl bg-indigo-600 px-10 py-4 text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        <div className="mt-5 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
