import { z } from 'zod';

const booleanQueryParam = z
  .enum(['true', 'false'])
  .transform(value => value === 'true')
  .optional();

export const paginationQuerySchema = z.strictObject({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  isActive: booleanQueryParam
});

export const paginationQueryClubSchema = paginationQuerySchema.extend({
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
  upcoming: booleanQueryParam,
  q: z.string().trim().min(1).max(100).optional()
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
