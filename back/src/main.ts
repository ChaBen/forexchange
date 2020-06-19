import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = 3000;
  Logger.log(`start service, port: ${port}`, 'bootstrap');
  await app.listen(port);
}
bootstrap();
