import { ICreateCarImagesDTO } from '@modules/cars/dtos/ICreateCarImageDTO';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { CarImages, PrismaClient } from '@prisma/client';

class CarsImagesRepository implements ICarsImagesRepository {
  private repository;

  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.carImages;
  }

  public async create(data: ICreateCarImagesDTO): Promise<CarImages> {
    const image = await this.repository.create({
      data,
    });

    return image;
  }
}

export { CarsImagesRepository };
