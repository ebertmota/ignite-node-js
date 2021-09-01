import 'reflect-metadata';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-123',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'fsdafsdfsdfsdfsf',
    });

    expect(car).toHaveProperty('id');
  });

  it('should be able to create a new car available by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-123',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'fsdafsdfsdfsdfsf',
    });

    expect(car.available).toEqual(true);
  });

  it('should not be able to create more than one car with same license plate', async () => {
    await createCarUseCase.execute({
      name: 'Car Name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-123',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'fsdafsdfsdfsdfsf',
    });

    expect(
      createCarUseCase.execute({
        name: 'Car Name',
        description: 'Car description',
        daily_rate: 100,
        license_plate: 'ABC-123',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'fsdafsdfsdfsdfsf',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
