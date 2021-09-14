import { Rentals } from '@prisma/client';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rentals[] = [];

  async findOpenByCar(car_id: string): Promise<Rentals | undefined> {
    return this.rentals.find(
      rental => rental.car_id === car_id && rental.end_date === null,
    );
  }
  async findOpenByUser(user_id: string): Promise<Rentals | undefined> {
    return this.rentals.find(
      rental => rental.user_id === user_id && rental.end_date === null,
    );
  }
}

export { RentalsRepositoryInMemory };
