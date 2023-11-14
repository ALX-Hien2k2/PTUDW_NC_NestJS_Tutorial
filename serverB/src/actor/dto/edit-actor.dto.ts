import { IsOptional, IsString } from 'class-validator';

export class EditActorDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
