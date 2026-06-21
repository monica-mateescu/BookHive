import { API_URL } from "@config";
import type { Book, BooksResponse } from "@types";

export const createBook = async (formData: FormData): Promise<Book> => {
  const res = await fetch(`${API_URL}/api/books`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create book");
  }

  const data: Book = await res.json();
  return data;
};

export const getBooks = async (
  page = 1,
  limit = 10,
  filters?: {
    isActive?: string;
  },
): Promise<BooksResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value);
      }
    });
  }

  const res = await fetch(`${API_URL}/api/books?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch books");

  const data = await res.json();
  return data;
};

export const getBookById = async (id: string): Promise<Book> => {
  const res = await fetch(`${`${API_URL}/api/books`}/${id}`);

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Failed to fetch book");
  }

  const data: Book = await res.json();
  return data;
};

export const getBookBySlug = async (slug: string): Promise<Book> => {
  const res = await fetch(`${API_URL}/api/books/slug/${slug}`);

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Failed to fetch book");
  }

  const data: Book = await res.json();
  return data;
};

export const updateBookById = async (
  id: string,
  formData: FormData,
): Promise<Book> => {
  const res = await fetch(`${API_URL}/api/books/${id}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Failed to update book");
  }

  const data: Book = await res.json();
  return data;
};

export const deleteBookById = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/api/books/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Failed to delete book");
  }
};
