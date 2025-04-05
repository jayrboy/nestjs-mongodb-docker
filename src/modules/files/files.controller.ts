import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { diskStorage } from 'multer';
import { fileNameEditor, imageFileFilter } from './file.utils';
import { Response } from 'src/services/response';

@Controller('api/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        filename: fileNameEditor,
        destination: 'public/uploads',
      }),
      limits: {
        fileSize: 500 * 1024, // 500 KB
      },
      fileFilter: imageFileFilter,
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateFileDto,
  ): Promise<Response> {
    const createdFile = this.filesService.create(file, dto.description);
    return new Response(201, 'Created', createdFile);
  }
}
