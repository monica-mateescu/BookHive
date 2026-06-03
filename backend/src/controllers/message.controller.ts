import type { RequestHandler } from 'express';
import { messageService } from '#services';
import type { CursorPagination, CursorQuery } from '#types';

export const getMessages: RequestHandler<{ clubId: string }, CursorPagination, {}, CursorQuery> = async (req, res) => {
  const { clubId } = req.params;
  const { cursor, limit } = req.query;

  const messages = await messageService.getMessagesByClubId(clubId, cursor, limit);

  res.json(messages);
};
