import { createBook, getBookById, updateBookById } from "@data";
import type { Book } from "@types";
import type { CreateBookFormData } from "@types";
import { type ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

const initialForm: CreateBookFormData = {
  title: "",
  author: "",
  isbn: "",
  summary: "",
  imageFile: null,
  publishedYear: new Date().getFullYear(),
  isActive: false,
};

const CreateBookForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const navigate = useNavigate();

  const topRef = useRef<HTMLDivElement | null>(null);

  const [loadingBook, setLoadingBook] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [form, setForm] = useState<CreateBookFormData>(initialForm);

  const [existingImage, setExistingImage] = useState<string>("");

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (!isEdit || !id) return;

    let ignore = false;

    (async () => {
      try {
        setLoadingBook(true);
        setError("");

        const book: Book = await getBookById(id);

        if (ignore) return;

        setForm({
          title: book.title || "",
          author: book.author || "",
          isbn: book.isbn || "",
          summary: book.summary || "",
          imageFile: null,
          publishedYear: book.publishedYear || new Date().getFullYear(),
          isActive: book.isActive ?? false,
        });

        setExistingImage(book.image ?? "");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to fetch a book");
        scrollToTop();
      } finally {
        setLoadingBook(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [isEdit, id]);

  const canSubmit = useMemo(() => {
    if (!form.title.trim()) return false;
    if (!form.author.trim()) return false;
    if (!form.isbn.trim()) return false;
    if (!form.summary.trim()) return false;

    if (!isEdit && !form.imageFile) return false;
    if (isEdit && !form.imageFile && !existingImage) return false;

    return true;
  }, [form, isEdit, existingImage]);

  const setField = <K extends keyof CreateBookFormData>(
    key: K,
    value: CreateBookFormData[K],
  ) => setForm((p) => ({ ...p, [key]: value }));

  const onText =
    (key: keyof CreateBookFormData) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setField(key, e.target.value as CreateBookFormData[typeof key]);
    };

  const onCheckbox =
    (key: "isActive") => (e: ChangeEvent<HTMLInputElement>) => {
      setField(key, e.target.checked);
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
    submitting || loadingBook ? "btn btn-disabled" : "btn cursor-pointer";

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      setSubmitting(true);

      const fd = new FormData();

      fd.append("title", form.title);
      fd.append("author", form.author);
      fd.append("isbn", form.isbn);
      fd.append("summary", form.summary);
      fd.append("publishedYear", form.publishedYear.toString());
      fd.append("isActive", form.isActive.toString());

      if (form.imageFile) fd.append("image", form.imageFile);

      if (isEdit && id) {
        await updateBookById(id, fd);
        setSuccess("Book updated successfully.");
      } else {
        await createBook(fd);
        setSuccess("Book created successfully.");
      }

      scrollToTop();

      if (!isEdit) {
        setForm(initialForm);
        setExistingImage("");
      } else {
        navigate("/admin/books");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create a book");
      scrollToTop();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="mt-5 text-center text-3xl font-semibold">
        {isEdit ? "Edit book" : "Create new book"}
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
                <label htmlFor="title" className="sr-only">
                  Book title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Book title"
                  value={form.title}
                  onChange={onText("title")}
                  required
                  disabled={submitting || loadingBook}
                />
              </div>

              <div>
                <label htmlFor="author" className="sr-only">
                  Author
                </label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Author"
                  value={form.author}
                  onChange={onText("author")}
                  required
                  disabled={submitting || loadingBook}
                />
              </div>

              <div>
                <label htmlFor="isbn" className="sr-only">
                  ISBN
                </label>
                <input
                  id="isbn"
                  name="isbn"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="ISBN"
                  value={form.isbn}
                  onChange={onText("isbn")}
                  required
                  disabled={submitting || loadingBook}
                />
              </div>

              <div>
                <label htmlFor="summary" className="sr-only">
                  Summary
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  className="textarea textarea-bordered w-full"
                  placeholder="Summary"
                  value={form.summary}
                  onChange={onText("summary")}
                  required
                  disabled={submitting || loadingBook}
                />
              </div>

              <div>
                <label htmlFor="publishedYear" className="sr-only">
                  Published year
                </label>
                <input
                  id="publishedYear"
                  name="publishedYear"
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="Published year"
                  value={form.publishedYear}
                  onChange={onText("publishedYear")}
                  required
                  disabled={submitting || loadingBook}
                />
              </div>

              <div className="flex items-center gap-3">
                <label htmlFor="preview" className="sr-only">
                  Preview
                </label>
                <input
                  id="preview"
                  name="preview"
                  className="input input-bordered w-full"
                  placeholder="Book image"
                  value={form.imageFile?.name ?? ""}
                  readOnly
                  disabled={submitting || loadingBook}
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
                    disabled={submitting || loadingBook}
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
                    alt="Book preview"
                    className="h-150 w-full object-cover"
                  />
                </div>
              )}
              {isEdit && !form.imageFile && existingImage && (
                <p className="mt-2 text-xs text-(--gray-primary)">
                  Current image will stay unless you upload a new one.
                </p>
              )}
            </div>

            <div className="mt-10">
              <label
                htmlFor="isActive"
                className="label cursor-pointer text-(--brand-secondary)"
              >
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={form.isActive}
                  onChange={onCheckbox("isActive")}
                  disabled={submitting || loadingBook}
                />
                Is active book?
              </label>
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="submit"
                disabled={!canSubmit || submitting || loadingBook}
                className={buttonClass}
              >
                {submitting
                  ? "Saving..."
                  : isEdit
                    ? "Save changes"
                    : "Create book"}
              </button>
            </div>

            {isEdit && (
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={() => navigate("/admin/books")}
                  className="cursor-pointer text-(--brand-primary) no-underline hover:underline"
                >
                  ← Back to books list
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBookForm;
