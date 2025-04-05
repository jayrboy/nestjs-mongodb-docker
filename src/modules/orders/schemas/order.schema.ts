import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/modules/products/schemas/product.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: [Types.ObjectId], ref: 'Product', required: true })
  products: Product[]; // references to Product model

  @Prop({ required: true })
  quantity: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
