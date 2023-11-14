import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { WinstonModule } from 'nest-winston';
// import { transports, format } from 'winston';
import 'winston-daily-rotate-file';
import 'winston-mongodb';
// import { Loggly } from 'winston-loggly-bulk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: WinstonModule.createLogger({
    //   transports: [
    //     new transports.DailyRotateFile({
    //       filename: `logs/%DATE%.log`,
    //       format: format.combine(format.timestamp(), format.json()),
    //       datePattern: 'YYYY-MM-DD',
    //       maxSize: 100000, // 100KB
    //     }),
    //     new transports.Console({
    //       format: format.combine(
    //         format.cli(),
    //         format.splat(),
    //         format.timestamp(),
    //         format.printf((info) => {
    //           return `${info.timestamp} ${info.level}:${info.message}`;
    //         }),
    //       ),
    //     }),
    //     new transports.MongoDB({
    //       db: process.env.MONGODB,
    //       collection: 'logs',
    //       options: {
    //         useUnifiedTopology: true,
    //       },
    //       format: format.combine(
    //         format.timestamp(),
    //         format.json(),
    //         format.metadata(),
    //       ),
    //     }),
    //     new Loggly({
    //       token: '916a10ca-755f-43e5-944b-a1aa693e5d4c',
    //       subdomain: 'localhost',
    //       tags: ['Winston-Loggly'],
    //       json: true,
    //     }),
    //   ],
    // }),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  ); // If whitelist = true, then it will remove any properties that are not in the DTO
  const port = 3001;
  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}

bootstrap();
