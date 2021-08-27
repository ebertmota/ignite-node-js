import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { deleteFile } from '@shared/utils/file';

import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = (await this.usersRepository.findById(user_id)) as User;

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    await this.usersRepository.update(user);
  }
}

export { UpdateUserAvatarUseCase };
