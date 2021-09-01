import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { Request, Response, NextFunction } from 'express';

import { AppError } from '@shared/errors/AppError';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user) {
    throw new AppError('invalid token', 401);
  }

  if (!user.isAdmin) {
    throw new AppError('invalid token', 401);
  }

  return next();
}
