import { Module } from '@nestjs/common';
import { ActorModule } from './actor/actor.module';
import { FilmModule } from './film/film.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ActorModule,
    FilmModule,
    PrismaModule,
  ],
})
export class AppModule {}
