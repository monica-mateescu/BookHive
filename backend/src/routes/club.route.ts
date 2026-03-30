import { Router } from 'express';
import { getClubs, createClub, getClubById, updateClub, deleteClub } from '#controllers';
import { authMiddleware, validateZod, validateObjectId } from '#middlewares';
import { paginationQuerySchema, clubInputSchema } from '#schemas';

const clubRouter = Router();

clubRouter.get('/', validateZod(paginationQuerySchema), getClubs);
clubRouter.post('/', authMiddleware, validateZod(clubInputSchema), createClub);
clubRouter.get('/:id', validateObjectId('id'), getClubById);
clubRouter.put('/:id', authMiddleware, validateObjectId('id'), validateZod(clubInputSchema), updateClub);
clubRouter.delete('/:id', authMiddleware, validateObjectId('id'), deleteClub);

export default clubRouter;
