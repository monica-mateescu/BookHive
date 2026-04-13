import type { RequestHandler } from 'express';
import { auth } from '#utils';
import { fromNodeHeaders } from 'better-auth/node';
import { User } from '#models';
import type { UsersPagination, UsersQuery } from '#types';

export const getUsers: RequestHandler<{}, UsersPagination, {}, UsersQuery> = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const [total, data] = await Promise.all([
    User.countDocuments(),
    User.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  res.json({
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
};

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
