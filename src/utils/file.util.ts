import { extname } from 'path';
import * as fs from 'fs-extra';
import { MessageConstant } from '../constants/message.constant';

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  callback(null, `${Date.now()}${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    callback(new Error(MessageConstant.invalid_image), false);
  }
  callback(null, true);
};

export function moveFile(from: string, to: string): void {
  fs.rename(from, to, err => {
    if (err) throw err;
  });
}