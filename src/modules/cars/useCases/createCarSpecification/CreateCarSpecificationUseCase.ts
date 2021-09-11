import { CarWithSpecifications } from '@modules/cars/infra/prisma/types/Cars';
import { ICarsRepositories } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { CarSpecification } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepositories,

    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  public async execute({
    car_id,
    specifications_id,
  }: IRequest): Promise<CarWithSpecifications> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Car not found', 404);
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id,
    );

    const specificationsToCreate = specifications.map(specification => ({
      car_id,
      specification_id: specification.id,
    })) as CarSpecification[];

    await this.carsRepository.createSpecifications(specificationsToCreate);

    const carWithSpecifications = (await this.carsRepository.findById(
      car_id,
    )) as CarWithSpecifications;

    return carWithSpecifications;
  }
}

export { CreateCarSpecificationUseCase };
