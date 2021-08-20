import { Router } from 'express';

import { authRoutes } from '../../accounts/routes/auth.routes';
import { usersRoutes } from '../../accounts/routes/users.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationRoutes } from './specifications.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationRoutes);
router.use('/users', usersRoutes);
router.use('/sessions', authRoutes);

export { router };
