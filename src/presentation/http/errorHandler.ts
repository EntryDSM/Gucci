import { ErrorRequestHandler } from 'express';
import { HttpError } from './error';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ message: err.message });
  } else {
    next(err);
  }
};
