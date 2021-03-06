import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(
      token,
      process.env.APP_SECRET_TOKEN || '',
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(sub);

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    request.user = {
      id: user.id,
    };

    next();
  } catch (err) {
    console.log(err);
    throw new AppError('invalid token', 401);
  }
}
