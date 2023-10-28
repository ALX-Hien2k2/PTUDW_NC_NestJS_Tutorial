import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddFilmDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  releaseYear: number;

  @IsNumber()
  languageId: number;

  @IsNumber()
  rentalDuration: number;

  @IsNumber()
  rentalRate: number;

  @IsNumber()
  length: number;

  @IsNumber()
  replacementCost: number;

  @IsString()
  rating: 'G' | 'PG' | 'PG_13' | 'R' | 'NC_17';

  @IsString()
  specialFeatures: string;
}
