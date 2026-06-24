import { Book, Club } from '#models';

export const populatedFields = [
  { path: 'createdBy', select: 'firstName lastName email' },
  { path: 'members.userId', select: 'firstName lastName email' },
  { path: 'bookId', select: 'title slug author description image publishedYear' }
];

export const bookIsAssigned = async (bookId: string, clubId?: string): Promise<void> => {
  const filter: Record<string, unknown> = {
    bookId,
    status: { $in: ['pending', 'approved'] },
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
    Club.find(query).sort({ meetingDate: 1 }).skip(skip).limit(limit).populate(populatedFields)
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
