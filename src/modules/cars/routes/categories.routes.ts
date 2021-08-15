import { Router } from 'express';
// import multer from 'multer';

import { CreateCategoryController } from '../useCases/createCategory/CreateCategoryController';
// import { importCategoryController } from '../useCases/importCategory';
import { ListCategoriesController } from '../useCases/listCategories/ListCategoriesController';

const categoriesRoutes = Router();

const listCategoriesController = new ListCategoriesController();
const createCategoryController = new CreateCategoryController();

// const upload = multer({
//   dest: './tmp',
// });

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

// categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
//   return importCategoryController.handle(request, response);
// });

export { categoriesRoutes };
