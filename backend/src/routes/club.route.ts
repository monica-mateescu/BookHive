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
  getClubBySlug,
  getAllClubs
} from '#controllers';
import {
  authMiddleware,
  optionalAuthMiddleware,
  validateQuery,
  validateBody,
  validateObjectId,
  sanitizeSlug,
  fileHandler,
  cloudinaryUpload,
  requireAdmin
} from '#middlewares';
import { paginationQueryClubSchema, clubInputSchema } from '#schemas';

const clubRouter = Router();

clubRouter.get('/', validateQuery(paginationQueryClubSchema), getClubs);
clubRouter.get('/popular', getPopularClubs);
clubRouter.get('/me', authMiddleware, validateQuery(paginationQueryClubSchema), getMyClubs);
clubRouter.get('/admin', authMiddleware, requireAdmin, validateQuery(paginationQueryClubSchema), getAllClubs);
clubRouter.post('/', authMiddleware, fileHandler, cloudinaryUpload('clubs'), validateBody(clubInputSchema), createClub);
clubRouter.get('/:id', optionalAuthMiddleware, validateObjectId('id'), getClubById);
clubRouter.get('/slug/:slug', optionalAuthMiddleware, sanitizeSlug('slug'), getClubBySlug);
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
