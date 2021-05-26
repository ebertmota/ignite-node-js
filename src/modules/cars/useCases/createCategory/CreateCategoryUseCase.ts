import ICreateCategoryDTO from '../../dtos/ICreateCategoryDTO';
import { Category } from '../../model/Category';
import { CategoriesRepository } from '../../repositories/CategoriesRepository';

class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  public execute({ name, description }: ICreateCategoryDTO): Category {
    console.log('USE CASE');

    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    const category = this.categoriesRepository.create({ name, description });

    return category;
  }
}

export { CreateCategoryUseCase };