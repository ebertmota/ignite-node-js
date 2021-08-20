import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  upload(folder: string): any {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};
