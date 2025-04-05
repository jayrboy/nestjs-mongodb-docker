import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  _id: string | null;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;
}
