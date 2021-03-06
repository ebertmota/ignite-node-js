import { hash } from 'bcrypt';
import request from 'supertest';

import { app, prisma } from '@shared/infra/http/app';

describe('Create Category Controller', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    const deleteUser = prisma.user.deleteMany();
    const deleteCategory = prisma.category.deleteMany();

    await prisma.$transaction([deleteUser, deleteCategory]);
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

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to create a new category with existing name', async () => {
    const adminToken = await request(app)
      .post('/sessions')
      .send({
        email: 'test@rentx.com',
        password: 'admin123',
      })
      .expect(200);

    const { token } = adminToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
      .expect(400);

    expect(response.body).toStrictEqual({
      status: 'error',
      message: 'Category already exists',
    });
  });
});
