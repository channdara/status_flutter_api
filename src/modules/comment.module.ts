import { Module } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { CommentController } from '../controllers/comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { CommentEntity } from '../entities/comment.entity';
import { NewsFeedEntity } from '../entities/news.feed.entity';

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity, NewsFeedEntity])],
})
export class CommentModule {
}