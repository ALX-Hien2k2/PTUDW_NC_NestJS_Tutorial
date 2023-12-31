import { Module } from '@nestjs/common';
import { ActorModule } from './actor/actor.module';
import { FilmModule } from './film/film.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { LoggingInterceptor } from './logging/logging.interceptor';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ActorModule,
    FilmModule,
    PrismaModule,
    AuthModule,
  ],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    // },
  ],
})
export class AppModule {}
