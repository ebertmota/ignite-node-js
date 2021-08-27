import 'reflect-metadata';
import { AppError } from '@shared/errors/AppError';

import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepository: CategoriesRepositoryInMemory;
describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = await createCategoryUseCase.execute({
      name: 'category test',
      description: 'some description',
    });

    expect(category).toHaveProperty('id');
  });

  it('should not be able to create a category with same name', async () => {
    await createCategoryUseCase.execute({
      name: 'category test',
      description: 'some description',
    });

    expect(
      createCategoryUseCase.execute({
        name: 'category test',
        description: 'some description 2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
