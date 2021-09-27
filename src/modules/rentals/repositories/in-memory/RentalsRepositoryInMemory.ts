import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async findOpenByCar(car_id: string): Promise<Rental | undefined> {
    return this.rentals.find(
      rental => rental.car_id === car_id && !rental.end_date,
    );
  }
  async findOpenByUser(user_id: string): Promise<Rental | undefined> {
    return this.rentals.find(
      rental => rental.user_id === user_id && !rental.end_date,
    );
  }

  async findById(id: string): Promise<Rental | undefined> {
    return this.rentals.find(rental => rental.id === id);
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental: Rental = {
      id: uuid(),
      car_id,
      user_id,
      expected_return_date,
      total: 10,
      start_date: new Date(),
      end_date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.rentals.push(rental);

    return rental;
  }
}

export { RentalsRepositoryInMemory };
