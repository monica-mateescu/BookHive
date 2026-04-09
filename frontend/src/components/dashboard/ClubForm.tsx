import { type ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import useAuth from "../../contexts/useAuth";
import { getBooks } from "../../data/books";
import { createClub, getClubById, updateClubById } from "../../data/clubs";
import type { Book } from "../../types/book";
import type { Club } from "../../types/club";
import type { CreateClubFormData } from "../../types/clubForm";

const initialForm: CreateClubFormData = {
  name: "",
  description: "",
  meetingLink: "",
  meetingDate: "",
  maxMembers: 10,
  bookId: "",
};

const CreateClubForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { isAdmin } = useAuth();

  const navigate = useNavigate();

  const topRef = useRef<HTMLDivElement | null>(null);

  const [loadingClub, setLoadingClub] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [form, setForm] = useState<CreateClubFormData>(initialForm);
  const [books, setBooks] = useState<Book[]>([]);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoadingBooks(true);
        const data: Book[] = await getBooks();
        setBooks(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to fetch books");
      } finally {
        setLoadingBooks(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (!isEdit || !id) return;

    let ignore = false;

    (async () => {
      try {
        setLoadingClub(true);
        setError("");

        const club: Club = await getClubById(id);

        if (ignore) return;

        const bookId =
          typeof club.bookId === "object" && club.bookId !== null
            ? club.bookId.id
            : club.bookId;

        setForm({
          name: club.name || "",
          description: club.description || "",
          meetingLink: club.meetingLink || "",
          meetingDate: club.meetingDate
            ? new Date(club.meetingDate)
                .toLocaleString("sv-SE")
                .replace(" ", "T")
                .substring(0, 16)
            : "",
          maxMembers: club.maxMembers || 10,
          bookId: bookId || "",
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to fetch a club");
        scrollToTop();
      } finally {
        setLoadingClub(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [isEdit, id]);

  const canSubmit = useMemo(() => {
    if (!form.name.trim()) return false;
    if (!form.description.trim()) return false;
    if (!form.meetingLink.trim()) return false;
    if (!form.meetingDate.trim()) return false;
    if (!form.bookId.trim()) return false;

    return true;
  }, [form]);

  const setField = <K extends keyof CreateClubFormData>(
    key: K,
    value: CreateClubFormData[K],
  ) => setForm((p) => ({ ...p, [key]: value }));

  const onText =
    (key: keyof CreateClubFormData) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const value = e.target.value;

      if (key === "maxMembers") {
        setField(key, value === "" ? 0 : Number(value));
      } else {
        setField(key, value as CreateClubFormData[typeof key]);
      }
    };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      setSubmitting(true);

      const payload = {
        name: form.name,
        description: form.description,
        meetingLink: form.meetingLink,
        meetingDate: form.meetingDate,
        maxMembers: form.maxMembers ? Number(form.maxMembers) : 10,
        bookId: form.bookId,
      };

      if (isEdit && id) {
        await updateClubById(id, payload);
        setSuccess("Club updated successfully.");
      } else {
        await createClub(payload);
        setSuccess("Club created successfully.");
      }

      scrollToTop();

      if (!isEdit) {
        setForm(initialForm);
      } else {
        navigate("/");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create a club");
      scrollToTop();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-center">
        {isEdit ? "Edit club" : "Create new club"}
      </h1>
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
                <label htmlFor="name" className="sr-only">
                  Club name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base transition-all outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
                  placeholder="Club name"
                  value={form.name}
                  onChange={onText("name")}
                  required
                  disabled={submitting || loadingClub}
                />
              </div>

              <div>
                <label htmlFor="description" className="sr-only">
                  Club description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base transition-all outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
                  placeholder="Club description"
                  value={form.description}
                  onChange={onText("description")}
                  required
                  disabled={submitting || loadingClub}
                />
              </div>

              <div>
                <label htmlFor="meetingLink" className="sr-only">
                  Meeting link
                </label>
                <input
                  id="meetingLink"
                  name="meetingLink"
                  type="text"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base transition-all outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
                  placeholder="Meeting link"
                  value={form.meetingLink}
                  onChange={onText("meetingLink")}
                  required
                  disabled={submitting || loadingClub}
                />
              </div>

              <div>
                <label htmlFor="meetingDate" className="sr-only">
                  Meeting date
                </label>
                <input
                  id="meetingDate"
                  name="meetingDate"
                  type="datetime-local"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base transition-all outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
                  placeholder="Meeting date"
                  value={form.meetingDate}
                  onChange={onText("meetingDate")}
                  required
                  disabled={submitting || loadingClub}
                />
              </div>

              <div>
                <label htmlFor="maxMembers" className="sr-only">
                  Max members
                </label>
                <input
                  id="maxMembers"
                  name="maxMembers"
                  type="number"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base transition-all outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
                  placeholder="Max members"
                  value={form.maxMembers}
                  onChange={onText("maxMembers")}
                  required
                  disabled={submitting || loadingClub}
                />
              </div>

              <div>
                <label
                  htmlFor="bookId"
                  className="mb-1 ml-1 block text-sm font-medium text-gray-700"
                >
                  Book
                </label>
                <select
                  id="bookId"
                  name="bookId"
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-base transition-all outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 disabled:bg-gray-50 disabled:opacity-60"
                  value={form.bookId}
                  onChange={onText("bookId")}
                  required
                  disabled={submitting || loadingClub || loadingBooks}
                >
                  <option value="" disabled>
                    {loadingBooks ? "Loading books..." : "Please select a book"}
                  </option>
                  {books.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="submit"
                disabled={!canSubmit || submitting || loadingClub}
                className="w-full max-w-xs cursor-pointer rounded-xl bg-indigo-600 px-10 py-4 text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
              >
                {submitting
                  ? "Saving..."
                  : isEdit
                    ? "Save changes"
                    : "Save club"}
              </button>
            </div>

            {isEdit && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    isAdmin ? navigate("/dashboard/clubs") : navigate("/")
                  }
                  className="cursor-pointer text-gray-700 hover:text-gray-900"
                >
                  ← Back to {isAdmin ? "clubs list" : "home"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateClubForm;
