import { Car } from '@prisma/client';

import { ICreateCarDTO } from '../dtos/ICreateCarDTO';

interface ICarsRepositories {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
}

export { ICarsRepositories };
