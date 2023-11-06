import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignInDto, SignUpDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    const { email, password, firstName, lastName } = dto;

    // Check if the email is already taken
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new ForbiddenException('Email already taken');
    }

    // Hash the password
    const hash = await argon.hash(password);

    try {
      // Create the user
      const user = await this.prismaService.user.create({
        data: {
          first_name: firstName,
          last_name: lastName,
          email,
          password: hash,
        },
      });

      if (!user) {
        throw new Error('Create user failed');
      }

      // Generate access token
      const accessToken = await this.genAccessToken(user.user_id, user.email);

      return {
        user,
        accessToken,
      };

      // Return user's info
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw e;
    }
  }

  async signIn(dto: SignInDto) {
    const { email } = dto;
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new ForbiddenException('User not found');
      }

      // Generate access token
      const accessToken = await this.genAccessToken(user.user_id, user.email);

      return {
        user,
        accessToken,
      };
    } catch (e) {
      throw e;
    }
  }

  async genAccessToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_AT_SECRET'),
      expiresIn: '5m',
    });

    return accessToken;
  }
}
