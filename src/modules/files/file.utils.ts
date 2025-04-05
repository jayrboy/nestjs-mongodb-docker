import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';

// File - Rename Function
export const fileNameEditor = (req: Request, file: any, callback) => {
  const newFileName = Date.now() + '-' + file.originalname;
  callback(null, newFileName);
};

// File Filter - Validation Function
export const imageFileFilter = (
  req: Request,
  file: any,
  callback: (error: any, valid: boolean) => void,
) => {
  if (
    !file.originalname ||
    !file.originalname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)
  ) {
    return callback(
      new BadRequestException(`File must be of type jpg|jpeg|png|gif|svg|webp`),
      false,
    );
  }
  callback(null, true);
};
