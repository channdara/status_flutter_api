import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { base_url, port } from './constants/api.constant';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || port);
}

bootstrap().then(() => Logger.log(`Server is running on ${base_url}`, 'Bootstrap'));