import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  readonly lastName?: string;

  @IsNumber()
  readonly age: number;

  @IsBoolean()
  readonly isActive: boolean;
}
