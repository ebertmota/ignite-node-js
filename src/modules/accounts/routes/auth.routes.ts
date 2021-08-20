import { Router } from 'express';

import { AuthenticateUserController } from '../useCases/authenticateUser/AuthenticateUserController';

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authRoutes.post('/', authenticateUserController.handle);

export { authRoutes };
