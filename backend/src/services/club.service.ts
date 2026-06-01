import { Book, Club } from '#models';
import type { ClubInputDTO } from '#types';

export const populatedFields = [
  { path: 'createdBy', select: 'firstName lastName email' },
  { path: 'members.userId', select: 'firstName lastName email' },
  { path: 'bookId', select: 'title author description image publishedYear' }
];

export const assertBookExists = async (bookId: ClubInputDTO['bookId']): Promise<void> => {
  const exists = await Book.exists({ _id: bookId });
  if (!exists) {
    throw new Error('Book not found.', { cause: { status: 404 } });
  }
};

export const assertBookIsAssigned = async (bookId: ClubInputDTO['bookId'], clubId?: string): Promise<void> => {
  const filter: Record<string, unknown> = {
    bookId,
    isActive: true,
    meetingDate: { $gte: new Date() }
  };

  if (clubId) {
    filter._id = { $ne: clubId };
  }

  const exists = await Club.exists(filter);

  if (exists) {
    throw new Error('This book is already assigned to an active club.', {
      cause: { status: 400 }
    });
  }
};

export const isMember = async (clubId: string, userId: string): Promise<boolean> => {
  const exists = await Club.exists({ _id: clubId, 'members.userId': userId });

  return !!exists;
};

export const getPaginatedClubs = async ({
  filter,
  search,
  page,
  limit
}: {
  filter: Record<string, unknown>;
  search?: string;
  page: number;
  limit: number;
}) => {
  const skip = (page - 1) * limit;

  const query: Record<string, any> = { ...filter };

  if (search) {
    const regex = new RegExp(search, 'i');

    query.$or = [{ name: regex }, { description: regex }];
  }

  const [total, data] = await Promise.all([
    Club.countDocuments(query),
    Club.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate(populatedFields)
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
