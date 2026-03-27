export type CreateBookFormData = {
  title: string;
  author: string;
  isbn: string;
  summary: string;
  imageFile?: File | null;
  publishedYear: number;
};
