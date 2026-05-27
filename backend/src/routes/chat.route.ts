import { Router } from 'express';
import { getMessages } from '#controllers';
import { authMiddleware, validateObjectId } from '#middlewares';

const chatRouter = Router();

chatRouter.get('/:clubId', authMiddleware, validateObjectId('clubId'), getMessages);

export default chatRouter;
