import { extname } from 'path';

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  callback(null, `${Date.now()}${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};