import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const bootstrap = async() => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    cors: {
      origin: '*',
      credentials: false,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    },
    logger: ['error', 'warn', 'debug', 'log'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);
  const APP_PORT = configService.get('PORT') || 5000;

  await app.listen(APP_PORT, () => {
    console.log(`App running in http://localhost:${APP_PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Bootstrap failed', err);
  process.exit(1);
});