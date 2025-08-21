import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

interface ErrorResponse {
  error: string;
  message: string;
}

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): Response<ErrorResponse> {
  logger.error('API Error', {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    body: req.body,
  });

  if (err.message && err.message.includes('Vehicle does not have')) {
    return res.status(404).json({
      error: 'Not Found',
      message: err.message,
    });
  }

  if (err.message && err.message.includes('Failed to')) {
    return res.status(502).json({
      error: 'Bad Gateway',
      message: 'External service unavailable',
    });
  }

  if (err.message && err.message.includes('Invalid')) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid request format',
    });
  }

  return res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
  });
}

function notFoundHandler(req: Request, res: Response): Response<ErrorResponse> {
  logger.warn('Route not found', {
    method: req.method,
    url: req.url,
  });

  return res.status(404).json({
    error: 'Not Found',
    message: 'Route not found',
  });
}

export {
  errorHandler,
  notFoundHandler
};