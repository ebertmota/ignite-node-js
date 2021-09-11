import { v4 as uuid } from 'uuid';

import { Specification } from '.prisma/client';

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  public async create(data: ICreateSpecificationDTO): Promise<Specification> {
    const specification: Specification = {
      id: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
      ...data,
    };

    this.specifications.push(specification);

    return specification;
  }
  public async findByName(name: string): Promise<Specification | undefined> {
    return this.specifications.find(
      specification => specification.name === name,
    );
  }

  public async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter(specification =>
      ids.includes(specification.id),
    );

    return specifications;
  }
}

export { SpecificationRepositoryInMemory };
