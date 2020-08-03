import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { Logger } from '@nestjs/common';

async function bootstrap(): Promise<number> {
  const port: number = 3000;
  const app = await NestFactory.create(MainModule);
  await app.listen(port);
  return port;
}

bootstrap().then(port => {
  Logger.log(`Server started running on http://localhost:${port}/`, 'Bootstrap');
});
