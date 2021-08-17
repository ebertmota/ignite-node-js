import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCategories = container.resolve(ImportCategoryUseCase);

    await importCategories.execute(file);

    return response.status(201).send();
  }
}

export { ImportCategoryController };
