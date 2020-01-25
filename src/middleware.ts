import {Request, Response, NextFunction} from "express";

class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const NotFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error: HttpException = new HttpException(404, "Not Found!");
  next(error);
};

export const ServerError = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(error.status || 500);
  res.json({
    error: error.message
  });
};
