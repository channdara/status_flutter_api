import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { NewsFeedModule } from './modules/news.feed.module';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './modules/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    UserModule,
    AuthModule,
    NewsFeedModule,
    CommentModule,
  ],
})
export class MainModule {
}