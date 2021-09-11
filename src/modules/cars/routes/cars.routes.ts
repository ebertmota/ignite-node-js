import { Router } from 'express';

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CreateCarController } from '../useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '../useCases/createCarSpecification/CreateCarSpecificationController';
import { ListCarsController } from '../useCases/listCars/ListCarsController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationsController =
  new CreateCarSpecificationController();

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

carsRoutes.get('/', listCarsController.handle);

export { carsRoutes };
