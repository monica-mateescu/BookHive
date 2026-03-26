import type { RequestHandler } from 'express';
import { Book } from '#models';
import type { BookDTO, BookInputDTO } from '#types';

export const getBooks: RequestHandler<{}, BookDTO[]> = async (_req, res) => {
  const books = await Book.find();
  res.json(books);
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
