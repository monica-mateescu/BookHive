import { Router } from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook, getBookBySlug } from '#controllers';
import {
  authMiddleware,
  fileHandler,
  cloudinaryUpload,
  isAdmin,
  validateObjectId,
  validateQuery,
  validateBody,
  sanitizeSlug
} from '#middlewares';
import { paginationQuerySchema, bookInputSchema } from '#schemas';

const bookRouter = Router();

bookRouter.get('/', validateQuery(paginationQuerySchema), getBooks);
bookRouter.post(
  '/',
  authMiddleware,
  isAdmin,
  fileHandler,
  cloudinaryUpload('covers'),
  validateBody(bookInputSchema),
  createBook
);
bookRouter.get('/:id', validateObjectId('id'), getBookById);
bookRouter.get('/slug/:slug', sanitizeSlug('slug'), getBookBySlug);
bookRouter.put(
  '/:id',
  authMiddleware,
  isAdmin,
  validateObjectId('id'),
  fileHandler,
  cloudinaryUpload('covers'),
  validateBody(bookInputSchema),
  updateBook
);
bookRouter.delete('/:id', authMiddleware, isAdmin, validateObjectId('id'), deleteBook);

export default bookRouter;
