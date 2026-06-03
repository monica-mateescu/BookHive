import { z } from 'zod';

export const cursorSchema = z.strictObject({
  limit: z.coerce.number().int().positive().optional(),
  cursor: z.string().optional()
});

export const cursorPaginationSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.strictObject({
    data: z.array(schema),
    nextCursor: z.string().nullable().optional(),
    hasMore: z.boolean()
  });
