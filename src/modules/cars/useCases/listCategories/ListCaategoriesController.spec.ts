import { hash } from 'bcrypt';
import request from 'supertest';

import { app, prisma } from '@shared/infra/http/app';

describe('List Categories', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    const deleteUser = prisma.user.deleteMany();
    const deleteCategory = prisma.category.deleteMany();

    await prisma.$transaction([deleteUser, deleteCategory]);
    await prisma.$disconnect();
  });

  it('should be able to list categories', async () => {
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

    const { body: category } = await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })
      .expect(201);

    const response = await request(app).get('/categories').expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toBe(category.id);
  });
});
