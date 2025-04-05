import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

@Schema({ timestamps: true })
export class File {
  @Prop()
  file: string;

  @Prop()
  filePath: string;

  @Prop()
  description: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
