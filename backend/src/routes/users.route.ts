import { Router } from 'express';
import { authMiddleware, requireAdmin, validateObjectId, validateQuery } from '#middlewares';
import { deleteUser, getUsers, restoreUser } from '#controllers';
import { paginationQuerySchema } from '#schemas';

const usersRouter = Router();

usersRouter.get('/', authMiddleware, requireAdmin, validateQuery(paginationQuerySchema), getUsers);
usersRouter.delete('/:id', authMiddleware, requireAdmin, validateObjectId('id'), deleteUser);
usersRouter.post('/:id/restore', authMiddleware, requireAdmin, validateObjectId('id'), restoreUser);

export default usersRouter;
