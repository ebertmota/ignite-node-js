import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCarsUseCase } from './ListCarsUseCase';

class ListCarsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category_id } = request.query;

    const listCars = container.resolve(ListCarsUseCase);

    const cars = await listCars.execute({
      name: name?.toString(),
      brand: brand?.toString(),
      category_id: category_id?.toString(),
    });

    return response.status(200).json(cars);
  }
}

export { ListCarsController };
