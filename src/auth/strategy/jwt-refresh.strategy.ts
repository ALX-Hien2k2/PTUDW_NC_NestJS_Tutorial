import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadDto } from '../dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      // ignoreExpiration: true,
      secretOrKey: config.get('JWT_RT_SECRET'),
    });
  }

  async validate(payload: JwtPayloadDto) {
    const { sub } = payload;

    try {
      // Check if user exists
      const user = await this.prisma.user.findUnique({
        where: {
          user_id: sub,
        },
      });

      if (!user) {
        throw new ForbiddenException('Invalid token');
      }

      // Append to req.user
      return payload;
    } catch (e) {
      throw e;
    }
  }
}
