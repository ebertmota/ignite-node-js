import { ICreateCarImagesDTO } from '@modules/cars/dtos/ICreateCarImageDTO';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { PrismaClient } from '@prisma/client';

class CarsImagesRepository implements ICarsImagesRepository {
  private repository;

  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.carImages;
  }

  public async createMany(data: ICreateCarImagesDTO[]): Promise<void> {
    await this.repository.createMany({
      data,
    });
  }
}

export { CarsImagesRepository };
