import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class GetFilmDto {
  @Type(() => Number)
  @IsNotEmpty()
  limit?: number;
}
