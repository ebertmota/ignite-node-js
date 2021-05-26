import { Specification } from '../model/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Specification;
  findByName(name: string): Specification | undefined;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
