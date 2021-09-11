import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';

import 'reflect-metadata';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should be able to add a new specification in a car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      brand: 'Brand1',
      description: 'Description',
      daily_rate: 110,
      fine_amount: 110,
      license_plate: 'ABC',
      category_id: 'jkdhaksdjhasd',
    });

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: ['kdjlkasdjl'],
    });
  });
});
