import { Router } from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook } from '#controllers';
import { authMiddleware, fileHandler, cloudinaryUpload, isAdmin, validateObjectId, validateZod } from '#middlewares';
import { paginationQuerySchema, bookInputSchema } from '#schemas';

const bookRouter = Router();

bookRouter.get('/', validateZod(paginationQuerySchema), getBooks);
bookRouter.post(
  '/',
  authMiddleware,
  isAdmin,
  fileHandler,
  cloudinaryUpload('covers'),
  validateZod(bookInputSchema),
  createBook
);
bookRouter.get('/:id', validateObjectId('id'), getBookById);
bookRouter.put(
  '/:id',
  authMiddleware,
  isAdmin,
  validateObjectId('id'),
  fileHandler,
  cloudinaryUpload('covers'),
  validateZod(bookInputSchema),
  updateBook
);
bookRouter.delete('/:id', authMiddleware, isAdmin, validateObjectId('id'), deleteBook);

export default bookRouter;
