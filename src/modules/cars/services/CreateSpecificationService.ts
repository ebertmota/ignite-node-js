import { Specification } from '../model/Specification';
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from '../repositories/ISpecificationsRepository';

class CreateSpecificationService {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  public execute({
    name,
    description,
  }: ICreateSpecificationDTO): Specification {
    const specificationAlreadyExists =
      this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }

    const category = this.specificationRepository.create({ name, description });

    return category;
  }
}

export { CreateSpecificationService };
