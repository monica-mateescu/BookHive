import type { RequestHandler } from 'express';
import { auth } from '#utils';
import { fromNodeHeaders } from 'better-auth/node';

import type { UsersPagination, UsersQuery } from '#types';
import { User } from '#models';
import type { ZodNull } from 'zod';

export const getUsers: RequestHandler<{}, UsersPagination, {}, UsersQuery> = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const { users: data, total } = await auth.api.listUsers({
    query: {
      limit,
      offset: (page - 1) * limit,
      sortBy: 'createdAt',
      sortDirection: 'desc'
    },
    headers: fromNodeHeaders(req.headers)
  });

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

export const deleteUser: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const headers = fromNodeHeaders(req.headers);
    const user = await User.findById(id);
    if (!user) {
      return next(new Error('User not found', { cause: { status: 404 } }));
    }
    if (user.deletedAt) {
      return next(new Error('User already deleted', { cause: { status: 400 } }));
    }

    // Soft delete the user by setting deletedAt field
    await auth.api.adminUpdateUser({
      body: {
        userId: id,
        data: { deletedAt: new Date() }
      },
      headers
    });

    // Revoke all active sessions for the user to log them out immediately
    await auth.api.revokeUserSessions({ body: { userId: id }, headers });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(new Error('Failed to delete user', { cause: { status: 500 } }));
  }
};

export const restoreUser: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const headers = fromNodeHeaders(req.headers);

    const user = await User.findById(id);
    if (!user) {
      return next(new Error('User not found', { cause: { status: 404 } }));
    }
    if (!user.deletedAt) {
      return next(new Error('User is not deleted', { cause: { status: 400 } }));
    }

    // Restore the user by setting deletedAt field to null
    await auth.api.adminUpdateUser({
      body: {
        userId: id,
        data: { deletedAt: null }
      },
      headers
    });

    res.json({ message: 'User restored successfully' });
  } catch (err) {
    next(new Error('Failed to restore user', { cause: { status: 500 } }));
  }
};
