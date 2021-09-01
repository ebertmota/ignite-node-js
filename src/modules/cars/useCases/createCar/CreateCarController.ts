import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarUseCase } from './CreateCarUseCase';

class CreateCarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      license_plate,
      fine_amount,
      description,
      daily_rate,
      category_id,
      brand,
    } = request.body;

    const createCar = container.resolve(CreateCarUseCase);

    const car = await createCar.execute({
      name,
      license_plate,
      fine_amount,
      description,
      daily_rate,
      category_id,
      brand,
    });

    return response.status(201).json(car);
  }
}
export { CreateCarController };
