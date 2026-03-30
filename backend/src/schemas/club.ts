import { z } from 'zod';
import { isValidObjectId, Types } from 'mongoose';
import { is } from 'zod/locales';

export const clubInputSchema = z.strictObject({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  meetingLink: z.url('Meeting link must be a valid URL'),
  meetingDate: z.coerce.date().refine(date => date > new Date(), 'Meeting date must be in the future'),
  maxMembers: z.coerce.number().int().optional(),
  bookId: z
    .string()
    .refine(id => isValidObjectId(id), 'Invalid book ID')
    .transform(id => new Types.ObjectId(id)),
  isActive: z.boolean().optional()
});

export const clubSchema = z.strictObject({
  _id: z.instanceof(Types.ObjectId),
  ...clubInputSchema.shape,
  createdBy: z.instanceof(Types.ObjectId),
  members: z.array(
    z.object({
      userId: z.instanceof(Types.ObjectId),
      role: z.enum(['member', 'admin']),
      joinedAt: z.date()
    })
  ),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date()
});
