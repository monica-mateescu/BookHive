import type { RequestHandler } from 'express';
import { z, type ZodObject } from 'zod';

export const validateZod =
  (zodSchema: ZodObject): RequestHandler =>
  (req, _res, next) => {
    const { data, error, success } = zodSchema.safeParse({ ...req.body, ...req.query });
    if (!success) {
      next(new Error(z.prettifyError(error), { cause: { status: 400 } }));
      return;
    }
    if (req.body) req.body = data;

    next();
  };
