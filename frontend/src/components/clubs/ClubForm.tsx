import useAuth from "@contexts/useAuth";
import {
  createClub,
  getBooks,
  getClubById,
  getClubs,
  updateClubById,
} from "@data";
import type { Book, Club, CreateClubFormData } from "@types";
import { type ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

const initialForm: CreateClubFormData = {
  name: "",
  description: "",
  meetingLink: "",
  meetingDate: "",
  maxMembers: 10,
  imageFile: null,
  bookId: "",
};

const CreateClubForm = () => {
  const { id, bookId: preselectedBookId } = useParams<{
    id: string;
    bookId: string;
  }>();
  const isEdit = Boolean(id);
  const { user, isAdmin } = useAuth();

  const navigate = useNavigate();

  const topRef = useRef<HTMLDivElement | null>(null);

  const [loadingClub, setLoadingClub] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [form, setForm] = useState<CreateClubFormData>(initialForm);
  const [existingImage, setExistingImage] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (preselectedBookId) {
      setForm((prev) => ({ ...prev, bookId: preselectedBookId }));
    }
  }, [preselectedBookId]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoadingBooks(true);
        const { data } = await getBooks(1, 100);
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
          imageFile: null,
          bookId: bookId || "",
        });

        setExistingImage(club.image ?? "");
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

  const onImage = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;

    setError("");
    setSuccess("");

    if (f && !f.type.startsWith("image/")) {
      setError("Only images are allowed.");
      setField("imageFile", null);
      e.target.value = "";
      scrollToTop();
      return;
    }

    setField("imageFile", f);
  };

  const buttonClass =
    !canSubmit || submitting
      ? "btn btn-disabled w-full"
      : "btn btn-primary btn-brand-primary w-full cursor-pointer";

  const uploadClass =
    submitting || loadingClub ? "btn btn-disabled" : "btn cursor-pointer";

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      setSubmitting(true);

      if (!isAdmin) {
        const { data: existingClubs } = await getClubs();

        const isBookInAnyClub = existingClubs.some((club) => {
          const clubBookId =
            typeof club.bookId === "object" && club.bookId !== null
              ? club.bookId.id
              : club.bookId;

          return clubBookId === form.bookId;
        });

        const isCreator = existingClubs.some((club) => {
          const clubBookId =
            typeof club.bookId === "object" && club.bookId !== null
              ? club.bookId.id
              : club.bookId;

          const creatorId =
            typeof club.createdBy === "object" && club.createdBy !== null
              ? club.createdBy.id
              : club.createdBy;

          return clubBookId === form.bookId && creatorId === user?.id;
        });

        if (isBookInAnyClub) {
          throw new Error("A club for this book already exists.");
        }

        if (isCreator) {
          throw new Error("You have already created a club for this book.");
        }
      }

      const fd = new FormData();

      fd.append("name", form.name);
      fd.append("description", form.description);
      fd.append("meetingLink", form.meetingLink);
      fd.append("meetingDate", form.meetingDate);
      fd.append("bookId", form.bookId);

      if (isAdmin) {
        fd.append("maxMembers", (form.maxMembers ?? 10).toString());
        if (form.imageFile) fd.append("image", form.imageFile);
      }

      if (isEdit && id) {
        await updateClubById(id, fd);
        setSuccess("Club updated successfully.");
      } else {
        await createClub(fd);
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
      {!user ? (
        <>
          <h1 className="text-center text-3xl font-semibold">
            Create new club
          </h1>
          <div className="my-10 w-full">
            <div className="mx-auto w-full max-w-xl text-center">
              You must be signed in to create a new club.
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-center text-3xl font-semibold">
            {isEdit ? "Edit club" : "Create new club"}
          </h1>
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
                    <label htmlFor="name" className="sr-only">
                      Club name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="input input-bordered w-full"
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
                      className="textarea textarea-bordered w-full"
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
                      className="input input-bordered w-full"
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
                      className="input input-bordered w-full"
                      placeholder="Meeting date"
                      value={form.meetingDate}
                      onChange={onText("meetingDate")}
                      required
                      disabled={submitting || loadingClub}
                    />
                  </div>

                  {isAdmin && (
                    <>
                      <div>
                        <label htmlFor="maxMembers" className="sr-only">
                          Max members
                        </label>
                        <input
                          id="maxMembers"
                          name="maxMembers"
                          type="number"
                          className="input input-bordered w-full"
                          placeholder="Max members"
                          value={form.maxMembers}
                          onChange={onText("maxMembers")}
                          required
                          disabled={submitting || loadingClub}
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label htmlFor="bookId" className="sr-only">
                      Book
                    </label>
                    <select
                      id="bookId"
                      name="bookId"
                      className="select select-bordered w-full"
                      value={form.bookId}
                      onChange={onText("bookId")}
                      required
                      disabled={
                        submitting ||
                        loadingClub ||
                        loadingBooks ||
                        !!preselectedBookId
                      }
                    >
                      <option value="" disabled>
                        {loadingBooks
                          ? "Loading books..."
                          : "Please select a book"}
                      </option>
                      {books.map((book) => (
                        <option key={book.id} value={book.id}>
                          {book.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {isAdmin && (
                    <>
                      <div className="flex items-center gap-3">
                        <label htmlFor="preview" className="sr-only">
                          Preview
                        </label>
                        <input
                          id="preview"
                          name="preview"
                          className="input input-bordered w-full"
                          placeholder="Club image"
                          value={form.imageFile?.name ?? ""}
                          readOnly
                          disabled={submitting || loadingClub}
                        />
                        <label htmlFor="image" className={uploadClass}>
                          Upload
                          <input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={onImage}
                            disabled={submitting || loadingClub}
                          />
                        </label>
                      </div>

                      {(form.imageFile || existingImage) && (
                        <div className="overflow-hidden border border-(--gray-primary)">
                          <img
                            src={
                              form.imageFile
                                ? URL.createObjectURL(form.imageFile)
                                : existingImage
                            }
                            alt="Club preview"
                            className="h-150 w-full object-cover"
                          />
                        </div>
                      )}
                      {isEdit && !form.imageFile && existingImage && (
                        <p className="mt-2 text-xs text-(--gray-primary)">
                          Current image will stay unless you upload a new one.
                        </p>
                      )}
                    </>
                  )}
                </div>

                <div className="mt-10 flex justify-center">
                  <button
                    type="submit"
                    disabled={!canSubmit || submitting || loadingClub}
                    className={buttonClass}
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
                      className="cursor-pointer text-(--brand-primary) no-underline hover:underline"
                    >
                      ← Back to {isAdmin ? "clubs list" : "home"}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateClubForm;
