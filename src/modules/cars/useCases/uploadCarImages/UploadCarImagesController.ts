import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const uploadCarImages = container.resolve(UploadCarImagesUseCase);

    const { id } = request.params;
    const images = request.files as IFiles[];

    const filenames = images.map(file => file.filename);

    await uploadCarImages.execute({
      car_id: id,
      filenames,
    });

    return response.status(204).send();
  }
}

export { UploadCarImagesController };
