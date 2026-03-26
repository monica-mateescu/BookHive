import type { bookInputSchema, bookSchema } from '#schemas';
import { z } from 'zod';

export type BookInputDTO = z.infer<typeof bookInputSchema>;
export type BookDTO = z.infer<typeof bookSchema>;
