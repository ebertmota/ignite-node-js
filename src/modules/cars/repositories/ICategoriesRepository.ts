import { Categories } from '@prisma/client';

import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';

interface ICategoriesRepository {
  findByName(name: string): Promise<Categories | null>;
  list(): Promise<Categories[]>;
  create(data: ICreateCategoryDTO): Promise<Categories>;
}

export { ICategoriesRepository };
