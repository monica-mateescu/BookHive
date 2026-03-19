import type { ErrorRequestHandler } from 'express';

type ErrorPayload = {
  message: string;
  code?: string;
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    const payload: ErrorPayload = { message: err.message };
    if (err.cause) {
      const cause = err.cause as { status: number; code?: string };
      res.status(cause.status || 500).json(payload);
      return;
    }
    res.status(500).json(payload);
    return;
  }
  res.status(500).json({ message: 'Internal Server Error' });
  return;
};
