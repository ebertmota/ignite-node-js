import { Rental } from '@prisma/client';

import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';

interface IRentalsRepository {
  findOpenByCar(car_id: string): Promise<Rental | undefined>;
  findOpenByUser(user_id: string): Promise<Rental | undefined>;
  create(data: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };
