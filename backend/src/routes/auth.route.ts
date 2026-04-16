import { Router } from 'express';
import { me, logout } from '#controllers';
import { authMiddleware } from '#middlewares';

const authRouter = Router();

authRouter.get('/me', authMiddleware, me);
authRouter.post('/logout', logout);

export default authRouter;
