import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { File, FileDocument } from './schemas/file.schema';
import { Model } from 'mongoose';

@Injectable()
export class FilesService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  create(file: any, description: string): File {
    const createdFile = new this.fileModel({
      file: file.filename,
      filePath: file.path,
      description: description,
    });
    createdFile.save();
    return createdFile;
  }
}
