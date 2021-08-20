import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const updateuserAvatar = container.resolve(UpdateUserAvatarUseCase);

    const { id } = request.user;
    const avatar_file = request.file.filename;

    await updateuserAvatar.execute({
      user_id: id,
      avatar_file,
    });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
