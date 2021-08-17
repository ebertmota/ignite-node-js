import { PrismaClient, Categories } from '@prisma/client';

import ICreateCategoryDTO from '../../dtos/ICreateCategoryDTO';
import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private prisma = new PrismaClient();

  private repository = this.prisma.categories;

  public async list(): Promise<Categories[]> {
    const categories = await this.repository.findMany();

    return categories;
  }

  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<Categories> {
    const category = await this.repository.create({
      data: {
        name,
        description,
      },
    });

    return category;
  }

  public async findByName(name: string): Promise<Categories | null> {
    const category = await this.repository.findFirst({
      where: {
        name,
      },
    });

    return category;
  }
}

export { CategoriesRepository };
