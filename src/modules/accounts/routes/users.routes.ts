import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../config/upload';
import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticated';
import { CreateUserController } from '../useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../useCases/updateUserAvatar/UpdateUserAvatarController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

usersRoutes.post('/', createUserController.handle);

usersRoutes.use(ensureAuthenticated);

usersRoutes.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

export { usersRoutes };
