import { Router } from 'express';
import multer from 'multer';

import { ensureAuthenticated } from '../../../shared/infra/http/middlewares/ensureAuthenticated';
import { CreateCategoryController } from '../useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '../useCases/listCategories/ListCategoriesController';

const categoriesRoutes = Router();

const listCategoriesController = new ListCategoriesController();
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();

const upload = multer({
  dest: './tmp',
});

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  createCategoryController.handle,
);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
