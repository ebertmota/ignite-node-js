import { v4 as uuid } from 'uuid';

import { Category } from '.prisma/client';

import ICreateCategoryDTO from '../../dtos/ICreateCategoryDTO';
import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  public async findByName(name: string): Promise<Category | undefined> {
    const category = this.categories.find(category => category.name === name);

    return category;
  }
  public async list(): Promise<Category[]> {
    return this.categories;
  }
  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<Category> {
    const category = {
      id: uuid(),
      name,
      description,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.categories.push(category);

    return category;
  }
}

export { CategoriesRepositoryInMemory };
