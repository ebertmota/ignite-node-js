import { hash } from 'bcrypt';
import request from 'supertest';

import { app, prisma } from '@shared/infra/http/app';

describe('Create Category Controller', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    const deleteUser = prisma.user.deleteMany();

    await prisma.$transaction([deleteUser]);
    await prisma.$disconnect();
  });

  it('should be able to create a new category', async () => {
    const password = 'admin123';
    const passwordHash = await hash(password, 8);
    const { email } = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'test@rentx.com',
        password: passwordHash,
        driver_license: 'ABC',
        isAdmin: true,
      },
    });

    const adminToken = await request(app)
      .post('/sessions')
      .send({
        email,
        password,
      })
      .expect(200);

    const { token } = adminToken.body;

    console.log({ token });

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    console.log(response.body);
  });
});
