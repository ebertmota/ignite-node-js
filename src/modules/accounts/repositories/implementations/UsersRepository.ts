import { User, PrismaClient } from '.prisma/client';

import { ICreateUsersDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private prisma = new PrismaClient();

  private repository = this.prisma.user;

  public async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUsersDTO): Promise<User> {
    const user = await this.repository.create({
      data: {
        name,
        email,
        password,
        driver_license,
      },
    });

    return user;
  }

  public async update(userData: User): Promise<User> {
    const user = await this.repository.update({
      where: {
        id: userData.id,
      },
      data: {
        ...userData,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findFirst({
      where: {
        email,
      },
    });

    if (!user) return undefined;

    return user;
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const user = await this.repository.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!user) return undefined;

    return user;
  }
}

export { UsersRepository };
