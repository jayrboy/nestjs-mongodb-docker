import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  readonly name: string;

  @Prop()
  readonly description: string;

  @Prop()
  readonly price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
