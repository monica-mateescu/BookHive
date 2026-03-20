import { auth } from '#utils';
import { fromNodeHeaders } from 'better-auth/node';
import type { Request, Response, NextFunction } from 'express';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });

  if (!session) throw new Error('Unauthorized', { cause: { status: 401 } });

  req.user = session.user;

  next();
}
