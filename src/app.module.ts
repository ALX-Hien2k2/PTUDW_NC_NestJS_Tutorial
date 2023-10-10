import { Module } from '@nestjs/common';
import { ActorModule } from './actor/actor.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ActorModule,
    PrismaModule,
  ],
})
export class AppModule {}
