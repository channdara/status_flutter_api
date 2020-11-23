import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { UserEntity } from './user.entity';
import { Exclude } from 'class-transformer';
import { MessageConstant } from '../constants/message.constant';
import { CommentEntity } from './comment.entity';

@Entity('news_feeds')
export class NewsFeedEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToMany(() => UserEntity)
  @JoinTable({ joinColumn: { name: 'news_feed_id' }, inverseJoinColumn: { name: 'user_id' } })
  @Exclude({ toPlainOnly: true })
  likes: UserEntity[];

  @OneToMany(() => CommentEntity, comment => comment.news_feed)
  @Exclude({ toPlainOnly: true })
  comments: CommentEntity[];

  like_amount: number;

  comment_amount: number;

  is_liked: boolean;
}