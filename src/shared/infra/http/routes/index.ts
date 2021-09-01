import { authRoutes } from '@modules/accounts/routes/auth.routes';
import { usersRoutes } from '@modules/accounts/routes/users.routes';
import { carsRoutes } from '@modules/cars/routes/cars.routes';
import { categoriesRoutes } from '@modules/cars/routes/categories.routes';
import { specificationRoutes } from '@modules/cars/routes/specifications.routes';
import { Router } from 'express';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationRoutes);
router.use('/users', usersRoutes);
router.use('/sessions', authRoutes);
router.use('/cars', carsRoutes);

export { router };
