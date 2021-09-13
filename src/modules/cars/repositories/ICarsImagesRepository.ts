import { CarImages } from '@prisma/client';

import { ICreateCarImagesDTO } from '../dtos/ICreateCarImageDTO';

export interface ICarsImagesRepository {
  create(data: ICreateCarImagesDTO): Promise<CarImages>;
}
