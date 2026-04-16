import { Router } from 'express';
import { authMiddleware, isAdmin, validateZod } from '#middlewares';
import { getUsers } from '#controllers';
import { paginationQuerySchema } from '#schemas';

const usersRouter = Router();

usersRouter.get('/', authMiddleware, isAdmin, validateZod(paginationQuerySchema), getUsers);

export default usersRouter;
