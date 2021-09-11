import 'reflect-metadata';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListCarsUseCase } from './ListCarsUseCase';

let listCarUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      brand: 'branc',
      category_id: 'category_id',
      daily_rate: 10,
      fine_amount: 10,
      license_plate: 'SSS',
      description: 'descript',
    });

    const cars = await listCarUseCase.execute({});

    expect(cars).toHaveLength(1);
    expect(cars[0].id).toEqual(car.id);
  });

  it('should be able to list all availble by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      brand: 'brand1',
      category_id: 'category_id',
      daily_rate: 10,
      fine_amount: 10,
      license_plate: 'SSS',
      description: 'descript',
    });

    const cars = await listCarUseCase.execute({
      brand: 'brand1',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all availble by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Auge',
      brand: 'brand1',
      category_id: 'category_id',
      daily_rate: 10,
      fine_amount: 10,
      license_plate: 'SSS',
      description: 'descript',
    });

    const cars = await listCarUseCase.execute({
      name: 'Auge',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all availble by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Auge',
      brand: 'brand1',
      category_id: 'perfect123',
      daily_rate: 10,
      fine_amount: 10,
      license_plate: 'SSS',
      description: 'descript',
    });

    const cars = await listCarUseCase.execute({
      category_id: 'perfect123',
    });

    expect(cars).toEqual([car]);
  });
});
