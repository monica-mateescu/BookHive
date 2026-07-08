import type { RequestHandler } from 'express';
import { z, type ZodObject } from 'zod';

export const validateQuery =
  (zodSchema: ZodObject<any>): RequestHandler =>
  (req, _res, next) => {
    const { data, error, success } = zodSchema.safeParse(req.query);

    if (!success) {
      next(new Error(z.prettifyError(error), { cause: { status: 400 } }));
      return;
    }

    Object.assign(req.query, data);
    next();
  };

export const validateBody =
  (zodSchema: ZodObject<any>): RequestHandler =>
  (req, _res, next) => {
    const { data, error, success } = zodSchema.safeParse(req.body);

    if (!success) {
      next(new Error(z.prettifyError(error), { cause: { status: 400 } }));
      return;
    }

    req.body = data;
    next();
  };
