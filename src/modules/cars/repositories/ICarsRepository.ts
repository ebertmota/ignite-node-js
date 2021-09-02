import { Car } from '@prisma/client';

import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { IFindAvailableCarsDTO } from '../dtos/IFindAvailableCarsDTO';

interface ICarsRepositories {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findAvailable(data: IFindAvailableCarsDTO): Promise<Car[]>;
}

export { ICarsRepositories };
