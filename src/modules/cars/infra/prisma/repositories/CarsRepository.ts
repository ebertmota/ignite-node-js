import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICreateCarSpecificationDTO } from '@modules/cars/dtos/ICreateCarSpecificationDTO';
import { IFindAvailableCarsDTO } from '@modules/cars/dtos/IFindAvailableCarsDTO';
import { IUpdateCarAvailability } from '@modules/cars/dtos/IUpdateCarAvailability';
import { ICarsRepositories } from '@modules/cars/repositories/ICarsRepository';
import { PrismaClient, Category, Car } from '@prisma/client';

import { optional } from '@shared/utils/prisma';

import { CarWithSpecifications } from '../types/Cars';

class CarsRepository implements ICarsRepositories {
  private prisma = new PrismaClient();

  private repository = this.prisma.car;

  public async createSpecifications(
    data: ICreateCarSpecificationDTO[],
  ): Promise<void> {
    await this.prisma.carSpecification.createMany({
      data,
    });
  }

  public async updateAvailability({
    car_id,
    available,
  }: IUpdateCarAvailability): Promise<Car> {
    const car = await this.repository.update({
      data: {
        available,
      },
      where: {
        id: car_id,
      },
    });

    return car;
  }

  public async list(): Promise<Category[]> {
    const categories = await this.repository.findMany({
      include: {
        specifications: true,
      },
    });

    return categories;
  }

  public async update(data: Car): Promise<Car> {
    const car = await this.repository.update({
      where: {
        id: data.id,
      },
      data,
    });

    return car;
  }

  public async create({
    name,
    license_plate,
    brand,
    fine_amount,
    description,
    daily_rate,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = await this.repository.create({
      data: {
        name,
        license_plate,
        brand,
        fine_amount,
        description,
        daily_rate,
        category_id,
      },
    });

    return car;
  }

  public async findAvailable({
    name,
    brand,
    category_id,
  }: IFindAvailableCarsDTO): Promise<Car[]> {
    const car = await this.repository.findMany({
      where: {
        available: true,
        name: optional({
          contains: name,
        }),
        brand: optional(brand),
        category_id: optional(category_id),
      },
      include: {
        specifications: true,
      },
    });

    return car;
  }

  public async findById(
    id: string,
  ): Promise<CarWithSpecifications | undefined> {
    const car = await this.repository.findUnique({
      where: {
        id,
      },
      include: {
        specifications: true,
      },
    });

    if (!car) return undefined;

    return car;
  }

  public async findByLicensePlate(
    license_plate: string,
  ): Promise<Car | undefined> {
    const car = await this.repository.findFirst({
      where: {
        license_plate,
      },
    });

    if (!car) return undefined;

    return car;
  }
}

export { CarsRepository };
