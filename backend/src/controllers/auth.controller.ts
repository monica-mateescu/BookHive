import type { RequestHandler } from 'express';
import { auth } from '#utils';
import { fromNodeHeaders } from 'better-auth/node';

export const me: RequestHandler = async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  });
  return res.json(session);
};
