import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import { UserEntity } from './user.entity';
import { MessageConstant } from '../constants/message.constant';
import { NewsFeedEntity } from './news.feed.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: MessageConstant.required_feed_id })
  @Exclude({ toPlainOnly: true })
  news_feed_id: number;

  @Column()
  @Exclude({ toPlainOnly: true })
  user_id: number;

  @Column()
  @IsNotEmpty({ message: MessageConstant.required_content })
  @MaxLength(200)
  content: string;

  @Column()
  date: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => NewsFeedEntity)
  @JoinColumn({ name: 'news_feed_id' })
  @Exclude({ toPlainOnly: true })
  news_feed: NewsFeedEntity;
}