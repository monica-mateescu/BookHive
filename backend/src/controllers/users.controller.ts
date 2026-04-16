import type { RequestHandler } from 'express';

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
