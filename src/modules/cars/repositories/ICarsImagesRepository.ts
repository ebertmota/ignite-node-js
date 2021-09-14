import { ICreateCarImagesDTO } from '../dtos/ICreateCarImageDTO';

export interface ICarsImagesRepository {
  createMany(data: ICreateCarImagesDTO[]): Promise<void>;
}
