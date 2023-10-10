import { IsNotEmpty, IsString } from 'class-validator';

export class AddActorDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;
}
