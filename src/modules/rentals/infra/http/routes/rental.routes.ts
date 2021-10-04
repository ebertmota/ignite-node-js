import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListUserRentalsController } from '@modules/rentals/useCases/listUserRentals/ListUserRentalsController';
import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listUserRentalsController = new ListUserRentalsController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);

rentalRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle,
);

rentalRoutes.get('/', ensureAuthenticated, listUserRentalsController.handle);

export { rentalRoutes };
