import { Router } from 'express';

import { CreateSpecificationController } from '../useCases/createSpecification/CreateSpecificationController';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post('/', createSpecificationController.handle);

export { specificationRoutes };
