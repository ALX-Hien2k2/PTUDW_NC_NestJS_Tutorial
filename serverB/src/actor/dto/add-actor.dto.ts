import { IsNotEmpty, IsString } from 'class-validator';

export class AddActorDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
