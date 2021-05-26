import { Router } from 'express';

import { SpecificationsRepository } from '../repositories/SpecificationsRepository';
import { CreateSpecificationService } from '../services/CreateSpecificationService';

const specificationRoutes = Router();
const specificationsRepository = new SpecificationsRepository();

specificationRoutes.post('/', (request, response) => {
  const { name, description } = request.body;
  const createSpecificationService = new CreateSpecificationService(
    specificationsRepository,
  );

  const specification = createSpecificationService.execute({
    name,
    description,
  });

  return response.status(201).json(specification);
});

// categoriesRoutes.get('/', (request, response) => {
//   const categories = categoriesRepository.index();

//   return response.status(200).json(categories);
// });

export { specificationRoutes };
