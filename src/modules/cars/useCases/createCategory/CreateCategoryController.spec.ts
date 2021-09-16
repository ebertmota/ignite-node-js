import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Create Category Controller', () => {
  it('should be able to create a new category', async () => {
    await request(app).get('/cars').expect(200);
  });
});
