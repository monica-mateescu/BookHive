import { Router } from 'express';
import { getMessages } from '#controllers';
import { authMiddleware, validateObjectId, validateQuery } from '#middlewares';
import { cursorSchema } from '#schemas';

const chatRouter = Router();

chatRouter.get(
  '/:clubId/messages',
  authMiddleware,
  validateObjectId('clubId'),
  validateQuery(cursorSchema),
  getMessages
);

export default chatRouter;
