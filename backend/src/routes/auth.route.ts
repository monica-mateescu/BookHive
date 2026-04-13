import { Router } from 'express';
import { me, logout, getUsers } from '#controllers';
import { authMiddleware, isAdmin } from '#middlewares';
const authRouter = Router();

authRouter.get('/users', authMiddleware, isAdmin, getUsers);
authRouter.get('/me', authMiddleware, me);
authRouter.post('/logout', logout);

export default authRouter;
