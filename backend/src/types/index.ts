import { z } from 'zod';
import type {
  bookDetailsSchema,
  bookInputSchema,
  bookSchema,
  clubInputSchema,
  clubSchema,
  paginationQuerySchema,
  paginationQueryClubSchema,
  paginationSchema,
  messageInputSchema,
  messageSchema
} from '#schemas';

export type BookInputDTO = z.infer<typeof bookInputSchema>;
export type BookDTO = z.infer<typeof bookSchema>;
export type BookDetailsDTO = z.infer<typeof bookDetailsSchema>;

export type BooksQuery = z.infer<typeof paginationQuerySchema>;
export type BooksPagination = z.infer<typeof paginationSchema>;

export type ClubInputDTO = z.infer<typeof clubInputSchema>;
export type ClubDTO = z.infer<typeof clubSchema>;

export type ClubsQuery = z.infer<typeof paginationQueryClubSchema>;
export type ClubsPagination = z.infer<typeof paginationSchema>;

export type UsersQuery = z.infer<typeof paginationQuerySchema>;
export type UsersPagination = z.infer<typeof paginationSchema>;

export type MessageInputDTO = z.infer<typeof messageInputSchema>;
export type MessageDTO = z.infer<typeof messageSchema>;

export type Mailer = {
  sendEmail: (args: { to: string; subject: string; html: string }) => Promise<void> | void;
};
