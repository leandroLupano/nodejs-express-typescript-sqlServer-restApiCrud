/* eslint-disable @typescript-eslint/no-unused-vars */
import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { CustomError, HTTPError } from './errors.js';

const debug = createDebug('SERVER:error-middleware');

export const errorsMiddleware = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let status = 500;
  let statusMessage = 'Internal server error';

  if (error instanceof HTTPError) {
    status = error.statusCode;
    statusMessage = error.statusMessage;
  }

  res.status(status);
  res.json({
    error: [
      {
        status,
        statusMessage,
      },
    ],
  });

  debug(status, statusMessage, error.message);
};
