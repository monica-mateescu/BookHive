import { Router } from 'express';
import { me, logout } from '#controllers';
import { authMiddleware } from '#middlewares';

const authRouter = Router();

authRouter.post('/logout', logout);
authRouter.get('/me', authMiddleware, me);

export default authRouter;
