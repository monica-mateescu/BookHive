import type { RequestHandler } from 'express';
import { auth } from '#utils';
import { fromNodeHeaders } from 'better-auth/node';

export const me: RequestHandler = async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  });
  return res.json(session);
};

export const logout: RequestHandler = async (req, res) => {
  await auth.api.signOut({
    headers: fromNodeHeaders(req.headers)
  });

  return res.json({ message: 'Logged out successfully.' });
};
