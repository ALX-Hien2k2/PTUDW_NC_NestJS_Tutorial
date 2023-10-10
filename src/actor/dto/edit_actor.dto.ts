import { IsOptional, IsString } from 'class-validator';

export class EditActorDto {
  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;
}
