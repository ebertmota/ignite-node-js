import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { PrismaClient } from '@prisma/client';

import { Rental } from '.prisma/client';

import { IRentalsRepository } from '../../../repositories/IRentalsRepository';

class RentalsRepository implements IRentalsRepository {
  private repository;

  constructor() {
    const prisma = new PrismaClient();
    this.repository = prisma.rental;
  }

  public async findOpenByCar(car_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findFirst({
      where: {
        car_id,
        end_date: null,
      },
    });

    if (!rental) return undefined;

    return rental;
  }
  public async findOpenByUser(user_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findFirst({
      where: {
        user_id,
        end_date: null,
      },
    });

    if (!rental) return undefined;

    return rental;
  }

  public async findByUserId(user_id: string): Promise<Rental[]> {
    const rental = await this.repository.findMany({
      where: {
        user_id,
      },
    });

    return rental;
  }

  public async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = await this.repository.create({
      data,
    });

    return rental;
  }

  public async findById(id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findUnique({
      where: {
        id,
      },
    });

    if (!rental) return undefined;

    return rental;
  }

  public async update(data: Rental): Promise<Rental> {
    const rental = await this.repository.update({
      where: {
        id: data.id,
      },
      data,
    });

    return rental;
  }
}

export { RentalsRepository };
