import { Car } from '@prisma/client';

import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { ICreateCarSpecificationDTO } from '../dtos/ICreateCarSpecificationDTO';
import { IFindAvailableCarsDTO } from '../dtos/IFindAvailableCarsDTO';
import { CarWithSpecifications } from '../infra/prisma/types/Cars';

interface ICarsRepositories {
  create(data: ICreateCarDTO): Promise<Car>;
  createSpecifications(data: ICreateCarSpecificationDTO[]): Promise<void>;
  update(data: Car): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findAvailable(data: IFindAvailableCarsDTO): Promise<Car[]>;
  findById(car_id: string): Promise<CarWithSpecifications | undefined>;
}

export { ICarsRepositories };
