import { Book } from '#models';

export const bookExists = async (bookId: string): Promise<void> => {
  const exists = await Book.exists({ _id: bookId });
  if (!exists) {
    throw new Error('Book not found.', { cause: { status: 404 } });
  }
};

export const getPaginatedBooks = async ({
  filter,
  page,
  limit
}: {
  filter: Record<string, unknown>;
  page: number;
  limit: number;
}) => {
  const skip = (page - 1) * limit;

  const query: Record<string, any> = { ...filter };

  const [total, data] = await Promise.all([
    Book.countDocuments(query),
    Book.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
};
