import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import dayjs from 'dayjs';

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;

describe('create rental', () => {
  const dateAfter24hrs = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    dayJsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory,
      dayJsDateProvider,
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '',
      user_id: '',
      expected_return_date: dateAfter24hrs,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await createRentalUseCase.execute({
      car_id: 'carId',
      user_id: 'user1',
      expected_return_date: dateAfter24hrs,
    });

    expect(
      createRentalUseCase.execute({
        car_id: 'carId2',
        user_id: 'user1',
        expected_return_date: dateAfter24hrs,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await createRentalUseCase.execute({
      car_id: 'test',
      user_id: '123123',
      expected_return_date: dateAfter24hrs,
    });

    expect(
      createRentalUseCase.execute({
        car_id: 'test',
        user_id: '321321',
        expected_return_date: dateAfter24hrs,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    expect(
      createRentalUseCase.execute({
        car_id: 'test2',
        user_id: '1231232',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
