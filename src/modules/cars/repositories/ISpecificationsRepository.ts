import { Specifications } from '@prisma/client';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<Specifications>;
  findByName(name: string): Promise<Specifications | null>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
