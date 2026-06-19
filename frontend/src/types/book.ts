import type { Pagination } from "./pagination";

type ClubInfo = {
  id: string;
  name: string;
  slug: string;
  status: "pending" | "approved" | "rejected";
  createdBy: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  summary: string;
  image: string;
  publishedYear: number;
  isActive: boolean;
  club?: ClubInfo | null;
};

export type BooksResponse = {
  data: Book[];
  pagination: Pagination;
};
