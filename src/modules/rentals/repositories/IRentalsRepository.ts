import { Rentals } from '@prisma/client';

interface IRentalsRepository {
  findOpenByCar(car_id: string): Promise<Rentals | undefined>;
  findOpenByUser(user_id: string): Promise<Rentals | undefined>;
}

export { IRentalsRepository };
