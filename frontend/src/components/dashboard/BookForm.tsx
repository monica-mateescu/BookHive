import { type ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { createBook, getBookById, updateBookById } from "../../data/books";
import type { Book } from "../../types/book";
import type { CreateBookFormData } from "../../types/bookForm";

const initialForm: CreateBookFormData = {
  title: "",
  author: "",
  isbn: "",
  summary: "",
  imageFile: null,
  publishedYear: new Date().getFullYear(),
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
        });

        setExistingImage(book.image ?? "");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to fetch book");
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

  const onImage = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setField("imageFile", f);
  };

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
        navigate("/");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create books");
      scrollToTop();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-center">
        {isEdit ? "Edit book" : "Create new book"}
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
                <label htmlFor="title" className="sr-only">
                  Book title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base transition-all outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
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
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base transition-all outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
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
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base transition-all outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
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
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base transition-all outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
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
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base transition-all outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
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
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base transition-all outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
                  placeholder="Book image"
                  value={form.imageFile?.name ?? ""}
                  readOnly
                  disabled={submitting || loadingBook}
                />
                <label
                  htmlFor="image"
                  className="shrink-0 cursor-pointer rounded-xl border border-gray-200 px-4 py-3 text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900"
                >
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
                <div className="overflow-hidden rounded-2xl border border-gray-200">
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
                <p className="-mt-1 ml-2 text-xs text-(--text-muted)">
                  Current image will stay unless you upload a new one.
                </p>
              )}
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="submit"
                disabled={!canSubmit || submitting || loadingBook}
                className="w-full max-w-xs cursor-pointer rounded-xl bg-indigo-600 px-10 py-4 text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
              >
                {submitting
                  ? "Saving..."
                  : isEdit
                    ? "Save changes"
                    : "Save book"}
              </button>
            </div>

            {isEdit && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="cursor-pointer text-gray-700 hover:text-gray-900"
                >
                  ← Back to home
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
