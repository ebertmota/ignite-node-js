import { ICarsRepositories } from '@modules/cars/repositories/ICarsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

import { Rental } from '.prisma/client';

interface IRequest {
  id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepositories,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    if (!rental) {
      throw new AppError('Rental does not exists!');
    }

    const car = await this.carsRepository.findById(rental?.car_id);
    if (!car) {
      throw new AppError('Car does not exists!');
    }

    const minimum_daily = 1;

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareDays(rental.start_date, dateNow);

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareDays(
      dateNow,
      rental.expected_return_date,
    );

    let total = 0;
    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.carsRepository.updateAvailability({
      car_id: car.id,
      available: true,
    });
    await this.rentalsRepository.update(rental);

    return rental;
  }
}

export { DevolutionRentalUseCase };
