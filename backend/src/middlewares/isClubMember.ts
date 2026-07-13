import type { RequestHandler } from 'express';
import { clubService } from '#services';

export const isClubMember: RequestHandler<{ clubId: string }> = async (req, _res, next) => {
  const { clubId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    next(new Error('Unauthorized', { cause: { status: 401 } }));
    return;
  }

  const isMember = await clubService.isMember(clubId, userId);

  if (!isMember) {
    next(new Error('Forbidden', { cause: { status: 403 } }));
    return;
  }

  next();
};
