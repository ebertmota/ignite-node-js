import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const createCarSpecification = container.resolve(
      CreateCarSpecificationUseCase,
    );

    const carWithSpecifications = await createCarSpecification.execute({
      car_id: id,
      specifications_id,
    });

    return response.status(201).json(carWithSpecifications);
  }
}

export { CreateCarSpecificationController };
