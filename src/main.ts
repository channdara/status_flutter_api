import { NestFactory } from '@nestjs/core';
import { Logger, Module, ValidationPipe } from '@nestjs/common';
import { base_url, port } from './constants/api.constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    UserModule,
    AuthModule,
  ],
})
export class MainModule {
}

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}

bootstrap().then(() => {
  Logger.log(`Server is running on ${base_url}`, 'Bootstrap');
});