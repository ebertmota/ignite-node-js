import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { inject, injectable } from 'tsyringe';

import { Rental } from '.prisma/client';

interface IRequest {
  user_id: string;
}

@injectable()
export class ListUserRentalsUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.findByUserId(user_id);

    return rentals;
  }
}
