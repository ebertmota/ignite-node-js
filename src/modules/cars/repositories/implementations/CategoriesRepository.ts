import { PrismaClient, Category } from '@prisma/client';

import ICreateCategoryDTO from '../../dtos/ICreateCategoryDTO';
import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private prisma = new PrismaClient();

  private repository = this.prisma.category;

  public async list(): Promise<Category[]> {
    const categories = await this.repository.findMany();

    return categories;
  }

  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<Category> {
    const category = await this.repository.create({
      data: {
        name,
        description,
      },
    });

    return category;
  }

  public async findByName(name: string): Promise<Category | null> {
    const category = await this.repository.findFirst({
      where: {
        name,
      },
    });

    return category;
  }
}

export { CategoriesRepository };
