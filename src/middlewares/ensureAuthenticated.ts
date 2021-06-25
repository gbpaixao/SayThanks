import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const token = authToken.replace('Bearer ', '');

  try {
    const { sub } = verify(token, '06de5b4fe24b14d67b1a53a7d5f4f7cb') as IPayload;

    request.user_id = sub;
    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
