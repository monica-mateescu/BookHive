import { z } from 'zod';
import { Types } from 'mongoose';

export const bookInputSchema = z.strictObject({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  isbn: z.string().min(1, 'ISBN is required'),
  summary: z.string().min(1, 'Summary is required'),
  image: z
    .url({
      protocol: /^https?$/,
      hostname: z.regexes.domain
    })
    .nullish(),
  publishedYear: z.coerce.number().int().nullish()
});

export const bookSchema = z.strictObject({
  _id: z.instanceof(Types.ObjectId),
  ...bookInputSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date()
});
