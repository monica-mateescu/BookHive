import type { RequestHandler } from 'express';

export const isAdmin: RequestHandler = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    next(new Error('Forbidden', { cause: { status: 403 } }));
    return;
  }

  next();
};
