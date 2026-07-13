import { auth } from '#utils';
import { fromNodeHeaders } from 'better-auth/node';
import type { Request } from 'express';

export const getSessionUser = async (req: Request) => {
  try {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
    return session?.user ?? null;
  } catch (error) {
    return null;
  }
};
