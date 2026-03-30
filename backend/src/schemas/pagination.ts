import { z } from 'zod';

export const paginationQuerySchema = z.strictObject({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  isActive: z.coerce.boolean().optional()
});

export const paginationSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.strictObject({
    data: z.array(schema),
    pagination: z.strictObject({
      total: z.number(),
      page: z.number(),
      limit: z.number(),
      totalPages: z.number(),
      hasNextPage: z.boolean(),
      hasPrevPage: z.boolean()
    })
  });
