import { User } from '@prisma/client';

import { ICreateUsersDTO } from '../dtos/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<User>;
  update(userData: User): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(user_id: string): Promise<User | undefined>;
}

export { IUsersRepository };
