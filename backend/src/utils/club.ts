import { Book, Club } from '#models';
import type { ClubInputDTO } from '#types';

export const assertBookExists = async (bookId: ClubInputDTO['bookId']): Promise<void> => {
  const exists = await Book.exists({ _id: bookId });
  if (!exists) {
    throw new Error('Book not found', { cause: { status: 404 } });
  }
};

export const assertBookIsAssigned = async (bookId: ClubInputDTO['bookId'], clubId?: string): Promise<void> => {
  const now = new Date();

  const filter: Record<string, unknown> = {
    bookId,
    isActive: true,
    meetingDate: { $gt: now }
  };

  if (clubId) {
    filter._id = { $ne: clubId };
  }

  const exists = await Club.exists(filter);

  if (exists) {
    throw new Error('This book is already assigned to an active club with a future meeting date', {
      cause: { status: 400 }
    });
  }
};
