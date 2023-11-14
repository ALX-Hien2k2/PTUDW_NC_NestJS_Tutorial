import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class JwtPayloadDto {
  @IsNumber()
  @IsNotEmpty()
  sub: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  iat?: number;

  @IsNumber()
  exp?: number;
}
