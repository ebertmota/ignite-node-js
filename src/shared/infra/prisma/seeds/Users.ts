import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { hash } from 'bcrypt';

import { IPrismaClient } from '../seed';

async function createAdminUser(prisma: IPrismaClient): Promise<void> {
  const adminUser: ICreateUsersDTO = {
    name: 'Rentx Admin',
    email: 'admin@rentx.com',
    driver_license: 'none',
    password: await hash('123123123', 8),
  };

  await prisma.user.create({
    data: {
      ...adminUser,
      isAdmin: true,
    },
  });
}

export { createAdminUser };
