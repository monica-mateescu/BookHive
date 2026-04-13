import type { RequestHandler } from 'express';
import { Book } from '#models';
import type { BookDTO, BookInputDTO, BooksPagination, BooksQuery } from '#types';

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

export const getBookById: RequestHandler<{ id: string }, BookDTO> = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);
  if (!book) {
    throw new Error('Book not found', { cause: { status: 404 } });
  }
  res.json(book);
};

export const updateBook: RequestHandler<{ id: string }, BookDTO, BookInputDTO> = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findByIdAndUpdate(id, req.body, { returnDocument: 'after', runValidators: true });
  if (!book) {
    throw new Error('Book not found', { cause: { status: 404 } });
  }
  res.json(book);
};

export const deleteBook: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findByIdAndDelete(id);
  if (!book) {
    throw new Error('Book not found', { cause: { status: 404 } });
  }
  res.status(204).send();
};
