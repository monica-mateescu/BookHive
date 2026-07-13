import { userService } from '#services';

import type { Request, Response, NextFunction } from 'express';

export async function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const user = await userService.getSessionUser(req);

  if (!user) {
    return next(new Error('Unauthorized', { cause: { status: 401 } }));
  }

  req.user = user;

  next();
}

export async function optionalAuthMiddleware(req: Request, _res: Response, next: NextFunction) {
  const user = await userService.getSessionUser(req);

  if (user) {
    req.user = user;
  }

  next();
}
