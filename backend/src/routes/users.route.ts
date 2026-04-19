import { Router } from 'express';
import { authMiddleware, isAdmin, validateObjectId, validateZod } from '#middlewares';
import { deleteUser, getUsers, restoreUser } from '#controllers';
import { paginationQuerySchema } from '#schemas';

const usersRouter = Router();

usersRouter.get('/', authMiddleware, isAdmin, validateZod(paginationQuerySchema), getUsers);
usersRouter.delete('/:id', authMiddleware, isAdmin, validateObjectId('id'), deleteUser);
usersRouter.post('/:id/restore', authMiddleware, isAdmin, validateObjectId('id'), restoreUser);

export default usersRouter;
