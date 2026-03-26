import type { RequestHandler } from 'express';
import formidable, { type Fields, type Files, type Part } from 'formidable';

const maxFileSize = 5 * 1024 * 1024;

const filter = ({ mimetype }: Part) => {
  if (!mimetype || !mimetype.includes('image')) {
    throw new Error('Only images are allowed', { cause: { status: 400 } });
  }
  return true;
};

export const fileHandler: RequestHandler = (req, res, next) => {
  if (!req.is('multipart/form-data')) {
    return next();
  }

  const form = formidable({ filter, maxFileSize, multiples: false });

  form.parse(req, (err: unknown, fields: Fields, files: Files) => {
    if (err) {
      return next(err);
    }

    const normalizedFields = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
    );

    req.body = normalizedFields;
    const imageFile = files.image;
    req.image = Array.isArray(imageFile) ? imageFile[0] : imageFile;

    next();
  });
};
