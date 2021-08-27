import 'reflect-metadata';
import { AppError } from '@shared/errors/AppError';

import { ICreateUsersDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticaseUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUsersDTO = {
      driver_license: '0932382',
      name: 'Teste',
      email: 'user@teste.com',
      password: '1234',
    };

    await createUserUseCase.execute(user);

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty('token');
  });

  it('should should be able to authenticate a non existing user', async () => {
    expect(
      authenticateUserUseCase.execute({
        email: 'user@teste.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUsersDTO = {
      driver_license: '0932382',
      name: 'Teste',
      email: 'user@teste.com',
      password: '1234',
    };

    await createUserUseCase.execute(user);

    expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
