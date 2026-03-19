import type { RequestHandler } from 'express';

export const notFoundHandler: RequestHandler = (req, res, next) => {
  next(new Error('Not Found', { cause: { status: 404 } }));
};
