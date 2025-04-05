import { IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { UpdateProductDto } from 'src/modules/products/dto/update-product.dto';

export class UpdateOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly _id: string;

  readonly products: UpdateProductDto[];

  @IsOptional()
  @IsNumber()
  readonly quantity?: number;
}
