import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdSchema = z
  .string()
  .refine(id => Types.ObjectId.isValid(id), 'Invalid ID')
  .transform(id => new Types.ObjectId(id));

export const messageInputSchema = z.strictObject({
  clubId: objectIdSchema,
  text: z.string().trim().min(1, 'Message text is required').max(200, 'Message text must be at most 200 characters')
});

export const messageSchema = z.strictObject({
  _id: z.instanceof(Types.ObjectId),
  ...messageInputSchema.shape,
  senderId: z.instanceof(Types.ObjectId),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const joinClubSchema = z.strictObject({
  clubId: objectIdSchema
});
