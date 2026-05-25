import { Router } from 'express';
import {
  getClubs,
  getMyClubs,
  createClub,
  getClubById,
  updateClub,
  deleteClub,
  joinClub,
  leaveClub
} from '#controllers';
import { authMiddleware, validateZod, validateObjectId, fileHandler, cloudinaryUpload } from '#middlewares';
import { paginationQueryClubSchema, clubInputSchema } from '#schemas';

const clubRouter = Router();

clubRouter.get('/', validateZod(paginationQueryClubSchema), getClubs);
clubRouter.get('/me', authMiddleware, validateZod(paginationQueryClubSchema), getMyClubs);
clubRouter.post('/', authMiddleware, fileHandler, cloudinaryUpload('clubs'), validateZod(clubInputSchema), createClub);
clubRouter.get('/:id', validateObjectId('id'), getClubById);
clubRouter.put(
  '/:id',
  authMiddleware,
  fileHandler,
  cloudinaryUpload('clubs'),
  validateObjectId('id'),
  validateZod(clubInputSchema),
  updateClub
);
clubRouter.delete('/:id', authMiddleware, validateObjectId('id'), deleteClub);

clubRouter.post('/:id/join', authMiddleware, joinClub);
clubRouter.post('/:id/leave', authMiddleware, leaveClub);

export default clubRouter;
