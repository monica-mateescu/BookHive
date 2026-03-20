import { Router } from 'express';
import { me } from '#controllers';
import { authMiddleware } from '#middlewares';

const authRouter = Router();

authRouter.get('/me', authMiddleware, me);

export default authRouter;
