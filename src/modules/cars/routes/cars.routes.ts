import uploadConfig from '@config/upload';
import { Router } from 'express';
import multer from 'multer';

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CreateCarController } from '../useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '../useCases/createCarSpecification/CreateCarSpecificationController';
import { ListCarsController } from '../useCases/listCars/ListCarsController';
import { UploadCarImagesController } from '../useCases/uploadCarImages/UploadCarImagesController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationsController =
  new CreateCarSpecificationController();
const uploadCarImages = new UploadCarImagesController();

const upload = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationsController.handle,
);

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImages.handle,
);

carsRoutes.get('/', listCarsController.handle);

export { carsRoutes };
