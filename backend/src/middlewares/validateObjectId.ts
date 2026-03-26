import type { RequestHandler } from 'express';
import { isValidObjectId } from 'mongoose';

export const validateObjectId =
  (param: string): RequestHandler =>
  (req, _res, next) => {
    const id = req.params[param];

    if (!isValidObjectId(id)) {
      next(new Error('Invalid ID', { cause: { status: 400 } }));
      return;
    }

    next();
  };
