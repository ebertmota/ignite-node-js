import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUserRentalsUseCase } from './ListUserRentalsUseCase';

export class ListUserRentalsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listUserRentalsUseCase = container.resolve(ListUserRentalsUseCase);

    const { id: user_id } = request.user;

    const rentals = listUserRentalsUseCase.execute({
      user_id,
    });

    return response.json(rentals);
  }
}
