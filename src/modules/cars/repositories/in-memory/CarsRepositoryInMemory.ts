import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICreateCarSpecificationDTO } from '@modules/cars/dtos/ICreateCarSpecificationDTO';
import { IFindAvailableCarsDTO } from '@modules/cars/dtos/IFindAvailableCarsDTO';
import { IUpdateCarAvailability } from '@modules/cars/dtos/IUpdateCarAvailability';
import { CarWithSpecifications } from '@modules/cars/infra/prisma/types/Cars';
import { CarSpecification } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { Car } from '.prisma/client';

import { ICarsRepositories } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepositories {
  private cars: CarWithSpecifications[] = [];

  public async createSpecifications(
    data: ICreateCarSpecificationDTO[],
  ): Promise<void> {
    const carIndex = this.cars.findIndex(car => car.id === data[0].car_id);
    const car = this.cars.find(
      car => car.id === data[0].car_id,
    ) as CarWithSpecifications;

    car.specifications = data as CarSpecification[];

    this.cars[carIndex] = car;
  }

  public async updateAvailability({
    car_id,
    available,
  }: IUpdateCarAvailability): Promise<Car> {
    const findIndex = this.cars.findIndex(car => car.id === car_id);

    this.cars[findIndex].available = available;

    return this.cars[findIndex];
  }

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
      specifications: [],
    };

    this.cars.push(car);

    return car;
  }

  public async update(data: CarWithSpecifications): Promise<Car> {
    const findIndex = this.cars.findIndex(car => car.id === data.id);

    this.cars[findIndex] = data;

    return data;
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

  public async findById(
    id: string,
  ): Promise<CarWithSpecifications | undefined> {
    return this.cars.find(car => car.id === id);
  }
}

export { CarsRepositoryInMemory };
