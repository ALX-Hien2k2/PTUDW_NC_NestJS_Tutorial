import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as argon from 'argon2';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecretTokenGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const query: any = request.query;

    if (!query.time || !query.token) return false;

    if (Date.now() - query.time > 60000) return false;

    if (
      !(await argon.verify(
        query.token,
        request.url.split('?')[0] +
          query.time +
          this.configService.get<string>('SECRET'),
      ))
    )
      return false;

    return true;
  }
}
