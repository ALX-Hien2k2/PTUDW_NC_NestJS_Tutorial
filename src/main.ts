import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { WinstonModule } from 'nest-winston';
// import { transports, format } from 'winston';
import 'winston-daily-rotate-file';
import 'winston-mongodb';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MATH_PACKAGE_NAME } from './proto/math.pb';
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
  const port = 3000;
  const grpcUrl = '0.0.0.0:9000';

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: MATH_PACKAGE_NAME,
      protoPath: 'src/proto/math.proto',
      url: grpcUrl,
    },
  });

  console.log(`Server is running on port ${port}`);
  await app.listen(port);
  await app.startAllMicroservices();
}

bootstrap();
