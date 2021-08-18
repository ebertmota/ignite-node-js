import { Category } from '@prisma/client';

import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';

interface ICategoriesRepository {
  findByName(name: string): Promise<Category | null>;
  list(): Promise<Category[]>;
  create(data: ICreateCategoryDTO): Promise<Category>;
}

export { ICategoriesRepository };
