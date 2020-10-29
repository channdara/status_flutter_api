import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { UserEntity } from './user.entity';
import { Exclude } from 'class-transformer';
import { MessageConstant } from '../constants/message.constant';

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

  like_amount: number;

  is_liked: boolean;
}