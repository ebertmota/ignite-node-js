import { Rental } from '@prisma/client';

import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';

interface IRentalsRepository {
  findById(car_id: string): Promise<Rental | undefined>;
  findOpenByCar(car_id: string): Promise<Rental | undefined>;
  findOpenByUser(user_id: string): Promise<Rental | undefined>;
  create(data: ICreateRentalDTO): Promise<Rental>;
  update(rental: Rental): Promise<Rental>;
}

export { IRentalsRepository };
