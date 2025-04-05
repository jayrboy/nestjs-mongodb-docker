import { IsArray, IsMongoId, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsMongoId({ each: true }) // Validate each item in the array as a MongoDB ObjectId
  products: string[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity: number;
}
