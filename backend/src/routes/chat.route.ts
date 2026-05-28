import { Router } from 'express';
import { getMessages } from '#controllers';
import { authMiddleware, validateObjectId } from '#middlewares';

const chatRouter = Router();

chatRouter.get('/:clubId/messages', authMiddleware, validateObjectId('clubId'), getMessages);

export default chatRouter;
