import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFilmDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  releaseYear: number;

  @IsNumber()
  @IsOptional()
  languageId: number;

  @IsNumber()
  @IsOptional()
  rentalDuration: number;

  @IsNumber()
  @IsOptional()
  rentalRate: number;

  @IsNumber()
  @IsOptional()
  length: number;

  @IsNumber()
  @IsOptional()
  replacementCost: number;

  @IsString()
  @IsOptional()
  rating: 'G' | 'PG' | 'PG_13' | 'R' | 'NC_17';

  @IsString()
  @IsOptional()
  specialFeatures: string;
}
