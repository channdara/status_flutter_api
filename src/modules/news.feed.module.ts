import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsFeedService } from '../services/news.feed.service';
import { NewsFeedController } from '../controllers/news.feed.controller';
import { NewsFeedEntity } from '../entities/news.feed.entity';
import { UserEntity } from '../entities/user.entity';

@Module({
  providers: [NewsFeedService],
  controllers: [NewsFeedController],
  imports: [TypeOrmModule.forFeature([
    NewsFeedEntity,
    UserEntity,
  ])],
})
export class NewsFeedModule {
}