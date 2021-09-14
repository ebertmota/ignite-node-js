import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { ICarsRepositories } from '@modules/cars/repositories/ICarsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  filenames: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepositories,

    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
  ) {}

  public async execute({ car_id, filenames }: IRequest): Promise<void> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Car not found', 404);
    }

    const images = filenames.map(filename => ({
      car_id,
      filename,
    }));

    console.log(images);

    await this.carsImagesRepository.createMany(images);
  }
}

export { UploadCarImagesUseCase };
