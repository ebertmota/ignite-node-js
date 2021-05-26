import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import { Category } from '../model/Category';

interface ICategoriesRepository {
  findByName(name: string): Category | undefined;
  index(): Category[];
  create(data: ICreateCategoryDTO): void;
}

export { ICategoriesRepository };
