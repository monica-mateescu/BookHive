import { Router } from 'express';
import {
  getClubs,
  getMyClubs,
  createClub,
  getClubById,
  updateClub,
  deleteClub,
  joinClub,
  leaveClub,
  getPopularClubs,
  getClubBySlug
} from '#controllers';
import {
  authMiddleware,
  validateQuery,
  validateBody,
  validateObjectId,
  sanitizeSlug,
  fileHandler,
  cloudinaryUpload
} from '#middlewares';
import { paginationQueryClubSchema, clubInputSchema } from '#schemas';

const clubRouter = Router();

clubRouter.get('/', validateQuery(paginationQueryClubSchema), getClubs);
clubRouter.get('/popular', getPopularClubs);
clubRouter.get('/me', authMiddleware, validateQuery(paginationQueryClubSchema), getMyClubs);
clubRouter.post('/', authMiddleware, fileHandler, cloudinaryUpload('clubs'), validateBody(clubInputSchema), createClub);
clubRouter.get('/:id', validateObjectId('id'), getClubById);
clubRouter.get('/slug/:slug', sanitizeSlug('slug'), getClubBySlug);
clubRouter.put(
  '/:id',
  authMiddleware,
  fileHandler,
  cloudinaryUpload('clubs'),
  validateObjectId('id'),
  validateBody(clubInputSchema),
  updateClub
);
clubRouter.delete('/:id', authMiddleware, validateObjectId('id'), deleteClub);

clubRouter.post('/:id/join', authMiddleware, joinClub);
clubRouter.post('/:id/leave', authMiddleware, leaveClub);

export default clubRouter;
