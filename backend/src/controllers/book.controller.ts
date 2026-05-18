import type { RequestHandler } from 'express';
import { Book, Club } from '#models';
import type { BookDetailsDTO, BookDTO, BookInputDTO, BooksPagination, BooksQuery } from '#types';
import { deleteFromCloudinary } from '#utils';

export const getBooks: RequestHandler<{}, BooksPagination, {}, BooksQuery> = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const [total, data] = await Promise.all([
    Book.countDocuments(),
    Book.find().sort({ createdAt: -1 }).skip(skip).limit(limit)
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  res.json({
    data: data as BookDTO[],
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
};

export const createBook: RequestHandler<{}, BookDTO, BookInputDTO> = async (req, res) => {
  const { isbn } = req.body;
  const exists = await Book.exists({ isbn });
  if (exists) {
    throw new Error('Book with this ISBN already exists', { cause: { status: 400 } });
  }
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

export const getBookById: RequestHandler<{ id: string }, BookDetailsDTO> = async (req, res) => {
  const { id } = req.params;

  const [book, club] = await Promise.all([
    Book.findById(id),
    Club.findOne({ bookId: id, isActive: true }).select('_id name createdBy').lean()
  ]);

  if (!book) {
    throw new Error('Book not found', { cause: { status: 404 } });
  }

  res.json({
    ...book.toJSON(),
    club: club
      ? {
          id: club._id.toString(),
          name: club.name,
          createdBy: club.createdBy.toString()
        }
      : null
  });
};

export const updateBook: RequestHandler<{ id: string }, BookDTO, BookInputDTO> = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);
  if (!book) {
    throw new Error('Book not found', { cause: { status: 404 } });
  }

  const previousImage = book.image;

  book.set(req.body);

  await book.save();

  const newImage = req.body.image && req.body.image !== previousImage;

  if (newImage && previousImage) {
    await deleteFromCloudinary(previousImage);
  }

  res.json(book);
};

export const deleteBook: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);
  if (!book) {
    throw new Error('Book not found', { cause: { status: 404 } });
  }

  const previousImage = book.image;

  await book.deleteOne();

  if (previousImage) {
    await deleteFromCloudinary(previousImage);
  }

  res.status(204).send();
};
