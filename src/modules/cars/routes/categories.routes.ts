import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { createCategoryController } from '../useCases/createCategory/index';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', (request, response) => {
  const categories = categoriesRepository.index();

  return response.status(200).json(categories);
});

export { categoriesRoutes };
