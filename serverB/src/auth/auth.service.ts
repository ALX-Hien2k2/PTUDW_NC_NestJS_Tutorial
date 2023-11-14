import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadDto, SignInDto, SignUpDto } from './dto';
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

      delete user.password;

      const refreshToken = await this.genRefreshToken(user.user_id, user.email);

      return {
        user,
        accessToken,
        refreshToken,
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
    const { email, password } = dto;
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new ForbiddenException('User not found');
      }

      if (!(await argon.verify(user.password, password))) {
        throw new ForbiddenException('Wrong password');
      }

      // Generate access token
      const accessToken = await this.genAccessToken(user.user_id, user.email);

      const refreshToken = await this.genRefreshToken(user.user_id, user.email);

      await this.prismaService.user.update({
        where: {
          user_id: user.user_id,
        },
        data: {
          refresh_token: refreshToken,
        },
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch (e) {
      throw e;
    }
  }

  async refresh(id: number, refreshToken: string) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          user_id: id,
        },
      });

      if (!user) {
        throw new ForbiddenException('User not found');
      }

      if (refreshToken !== user.refresh_token) {
        throw new ForbiddenException('Invalid token');
      }

      const accessToken = await this.genAccessToken(user.user_id, user.email);

      return { accessToken };
    } catch (e) {
      throw e;
    }
  }

  async logout(id: number) {
    try {
      await this.prismaService.user.update({
        where: {
          user_id: id,
        },
        data: {
          refresh_token: null,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async genAccessToken(userId: number, email: string): Promise<string> {
    const payload: JwtPayloadDto = {
      sub: userId,
      email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_AT_SECRET'),
      expiresIn: '5m',
    });

    return accessToken;
  }

  async genRefreshToken(userId: number, email: string): Promise<string> {
    const payload: JwtPayloadDto = {
      sub: userId,
      email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_RT_SECRET'),
      expiresIn: '1d',
    });

    return accessToken;
  }
}
