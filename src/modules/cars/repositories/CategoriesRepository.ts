import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import { Category } from '../model/Category';
import { ICategoriesRepository } from './ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  index(): Category[] {
    return this.categories;
  }

  create({ name, description }: ICreateCategoryDTO): Category {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);

    return category;
  }

  findByName(name: string): Category | undefined {
    const category = this.categories.find(category => category.name === name);

    return category;
  }
}

export { CategoriesRepository };
