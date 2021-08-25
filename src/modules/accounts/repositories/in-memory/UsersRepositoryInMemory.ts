import { v4 as uuid } from 'uuid';

import { User } from '.prisma/client';

import { ICreateUsersDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  public async create({
    name,
    email,
    driver_license,
    password,
  }: ICreateUsersDTO): Promise<User> {
    const user = {
      id: uuid(),
      name,
      email,
      driver_license,
      password,
      avatar: null,
      isAdmin: false,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(user);

    return user;
  }
  public async update(userData: User): Promise<User> {
    const userIndex = this.users.findIndex(item => item.id === userData.id);

    this.users[userIndex] = userData;

    return this.users[userIndex];
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }
  public async findById(user_id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === user_id);

    return user;
  }
}

export { UsersRepositoryInMemory };
