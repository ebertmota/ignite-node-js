import { Router } from 'express';

import { CreateCarController } from '../useCases/createCar/CreateCarController';

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post('/', createCarController.handle);

export { carsRoutes };
