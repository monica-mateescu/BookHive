import type { RequestHandler } from 'express';
import { messageService } from '#services';
import type { MessageDTO } from '#types';

export const getMessages: RequestHandler<{ clubId: string }, MessageDTO[]> = async (req, res) => {
  const { clubId } = req.params;

  const messages = await messageService.getMessagesByClubId(clubId);

  res.json(messages);
};
