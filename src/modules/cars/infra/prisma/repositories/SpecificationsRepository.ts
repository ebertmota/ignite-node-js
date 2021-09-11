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

  public async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return specifications;
  }

  public async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findFirst({
      where: {
        name,
      },
    });

    if (!specification) return undefined;

    return specification;
  }
}

export { SpecificationsRepository };
