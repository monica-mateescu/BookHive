import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { authClient } from "../utils";

function RegisterForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    if (!email.trim()) return false;
    if (!password.trim()) return false;
    if (!firstName.trim()) return false;

    return true;
  }, [email, password, firstName]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const { error } = lastName
        ? await authClient.signUp.email({
            email: email.trim(),
            password,
            name: firstName,
            lastName: lastName,
            callbackURL: "/",
          })
        : await authClient.signUp.email({
            email: email.trim(),
            password,
            name: firstName,
            callbackURL: "/",
          });

      if (error) {
        setError(error.message || "Registration failed");
        return;
      }

      setSuccess("Registration successful.");
      setTimeout(() => navigate("/"), 1000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Registration failed");
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
              <label htmlFor="firstName" className="sr-only">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="First name*"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value.trim())}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base transition-all outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-6"
                required
                disabled={submitting}
              />
            </div>

            <div>
              <label htmlFor="lastName" className="sr-only">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Last name*"
                value={lastName}
                onChange={(e) => setLastName(e.target.value.trim())}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base transition-all outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-6"
                disabled={submitting}
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
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
                onChange={(e) => setPassword(e.target.value.trim())}
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
              {submitting ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
