import { PrismaClient, Categories } from '@prisma/client';

import ICreateCategoryDTO from '../../dtos/ICreateCategoryDTO';
import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private prisma = new PrismaClient();

  public async list(): Promise<Categories[]> {
    const categories = await this.prisma.categories.findMany();

    return categories;
  }

  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<Categories> {
    const category = await this.prisma.categories.create({
      data: {
        name,
        description,
      },
    });

    return category;
  }

  public async findByName(name: string): Promise<Categories | undefined> {
    const category = await this.prisma.categories.findFirst({
      where: {
        name,
      },
    });

    if (!category) {
      return undefined;
    }

    return category;
  }
}

export { CategoriesRepository };
