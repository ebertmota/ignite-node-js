import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '@modules/cars/repositories/ISpecificationsRepository';
import { PrismaClient, Specification } from '@prisma/client';

class SpecificationsRepository implements ISpecificationsRepository {
  private prisma = new PrismaClient();

  private repository = this.prisma.specification;

  public async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = await this.repository.create({
      data: {
        name,
        description,
      },
    });

    return specification;
  }

  public async findByName(name: string): Promise<Specification | null> {
    const specification = await this.repository.findFirst({
      where: {
        name,
      },
    });

    return specification;
  }
}

export { SpecificationsRepository };
