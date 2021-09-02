import { IFindAvailableCarsDTO } from '@modules/cars/dtos/IFindAvailableCarsDTO';
import { ICarsRepositories } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '@prisma/client';

class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepositories) {}
  public async execute({
    category_id,
    brand,
    name,
  }: IFindAvailableCarsDTO): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable({
      category_id,
      brand,
      name,
    });

    return cars;
  }
}

export { ListCarsUseCase };
