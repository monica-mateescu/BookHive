import type { RequestHandler } from 'express';

export const sanitizeSlug =
  (param: string): RequestHandler =>
  (req, _res, next) => {
    const slug = req.params[param];

    if (typeof slug !== 'string') {
      next(new Error('Invalid slug', { cause: { status: 400 } }));
      return;
    }

    const sanitized = slug.replace(/[^a-z0-9-]/g, '');

    if (!sanitized) {
      next(new Error('Invalid slug', { cause: { status: 400 } }));
      return;
    }

    req.params[param] = sanitized;
    next();
  };
