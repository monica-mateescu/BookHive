import type { Pagination } from "./pagination";

export type Book = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  summary: string;
  image: string;
  publishedYear: number;
};

export type BooksResponse = {
  data: Book[];
  pagination: Pagination;
};
