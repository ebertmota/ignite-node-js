import { User } from '@prisma/client';

import { ICreateUsersDTO } from '../dtos/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}

export { IUsersRepository };
