import { Router } from 'express';
import { getMessages } from '#controllers';
import { authMiddleware, isClubMember, validateObjectId, validateQuery } from '#middlewares';
import { cursorSchema } from '#schemas';

const chatRouter = Router();

chatRouter.get(
  '/:clubId/messages',
  authMiddleware,
  validateObjectId('clubId'),
  isClubMember,
  validateQuery(cursorSchema),
  getMessages
);

export default chatRouter;
