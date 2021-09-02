import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IFindAvailableCarsDTO } from '@modules/cars/dtos/IFindAvailableCarsDTO';
import { ICarsRepositories } from '@modules/cars/repositories/ICarsRepository';
import { PrismaClient, Category, Car } from '@prisma/client';

class CarsRepository implements ICarsRepositories {
  private prisma = new PrismaClient();

  private repository = this.prisma.car;

  public async list(): Promise<Category[]> {
    const categories = await this.repository.findMany();

    return categories;
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
        name: name
          ? {
              contains: name,
            }
          : undefined,
        brand: brand || undefined,
        category_id: category_id || undefined,
      },
    });

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
