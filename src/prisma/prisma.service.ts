import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          // url: 'mysql://admin:admin@localhost:3306/local',
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
