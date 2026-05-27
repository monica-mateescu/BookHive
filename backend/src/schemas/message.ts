import { z } from 'zod';
import { Types } from 'mongoose';

export const messageInputSchema = z.strictObject({
  clubId: z
    .string()
    .refine(id => Types.ObjectId.isValid(id), 'Invalid club ID')
    .transform(id => new Types.ObjectId(id)),
  text: z.string().min(1, 'Message text is required').max(200, 'Message text must be at most 200 characters')
});

export const messageSchema = z.strictObject({
  _id: z.instanceof(Types.ObjectId),
  ...messageInputSchema.shape,
  senderId: z.instanceof(Types.ObjectId),
  createdAt: z.date(),
  updatedAt: z.date()
});
