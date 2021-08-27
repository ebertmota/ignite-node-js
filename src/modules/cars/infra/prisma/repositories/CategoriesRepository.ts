import ICreateCategoryDTO from '@modules/cars/dtos/ICreateCategoryDTO';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { PrismaClient, Category } from '@prisma/client';

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

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findFirst({
      where: {
        name,
      },
    });

    if (!category) return undefined;

    return category;
  }
}

export { CategoriesRepository };
