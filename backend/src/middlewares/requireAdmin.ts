import { isAdmin } from '#utils';
import type { RequestHandler } from 'express';

export const requireAdmin: RequestHandler = (req, res, next) => {
  if (!req.user) {
    return next(new Error('Unauthorized', { cause: { status: 401 } }));
  }

  if (!isAdmin(req.user.role)) {
    return next(new Error('Forbidden', { cause: { status: 403 } }));
  }

  next();
};
