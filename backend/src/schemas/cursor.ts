import { Types } from 'mongoose';
import { z } from 'zod';

export const cursorSchema = z.strictObject({
  limit: z.coerce.number().int().min(1).max(50).optional(),
  cursor: z
    .string()
    .refine(id => Types.ObjectId.isValid(id), 'Invalid cursor')
    .optional()
});

export const cursorPaginationSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.strictObject({
    data: z.array(schema),
    nextCursor: z.string().nullable().optional(),
    hasMore: z.boolean()
  });
