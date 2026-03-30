import { z } from 'zod';
import type {
  bookInputSchema,
  bookSchema,
  clubInputSchema,
  clubSchema,
  paginationQuerySchema,
  paginationSchema
} from '#schemas';

export type BookInputDTO = z.infer<typeof bookInputSchema>;
export type BookDTO = z.infer<typeof bookSchema>;

export type ClubInputDTO = z.infer<typeof clubInputSchema>;
export type ClubDTO = z.infer<typeof clubSchema>;

export type ClubsQuery = z.infer<typeof paginationQuerySchema>;
export type ClubsPagination = z.infer<typeof paginationSchema>;

export type UserRole = 'user' | 'admin';
