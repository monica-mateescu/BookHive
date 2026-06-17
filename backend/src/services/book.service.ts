import { Book } from '#models';

export const bookExists = async (bookId: string): Promise<void> => {
  const exists = await Book.exists({ _id: bookId });
  if (!exists) {
    throw new Error('Book not found.', { cause: { status: 404 } });
  }
};
