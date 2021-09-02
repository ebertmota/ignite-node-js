import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IFindAvailableCarsDTO } from '@modules/cars/dtos/IFindAvailableCarsDTO';
import { v4 as uuid } from 'uuid';

import { Car } from '.prisma/client';

import { ICarsRepositories } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepositories {
  private cars: Car[] = [];

  public async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const car = {
      id: uuid(),
      name,
      brand,
      available: true,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.cars.push(car);

    return car;
  }

  public async findByLicensePlate(
    license_plate: string,
  ): Promise<Car | undefined> {
    const car = this.cars.find(car => car.license_plate === license_plate);

    return car;
  }

  public async findAvailable({
    brand,
    category_id,
    name,
  }: IFindAvailableCarsDTO): Promise<Car[]> {
    const all = this.cars.filter(car => {
      if (car.available) {
        if (brand) {
          return car.brand === brand;
        }

        if (category_id) {
          return car.category_id === category_id;
        }

        if (name) {
          return car.name === name;
        }

        return car;
      }

      return null;
    });

    return all;
  }
}

export { CarsRepositoryInMemory };
