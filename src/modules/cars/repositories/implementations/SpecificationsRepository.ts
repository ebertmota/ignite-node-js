import { PrismaClient, Specifications } from '@prisma/client';

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private prisma = new PrismaClient();

  private repository = this.prisma.specifications;

  public async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specifications> {
    const specification = await this.repository.create({
      data: {
        name,
        description,
      },
    });

    return specification;
  }

  public async findByName(name: string): Promise<Specifications | null> {
    const specification = await this.repository.findFirst({
      where: {
        name,
      },
    });

    return specification;
  }
}

export { SpecificationsRepository };
