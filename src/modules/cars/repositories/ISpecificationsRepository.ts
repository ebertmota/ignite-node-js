import { Specification } from '@prisma/client';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification | null>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
