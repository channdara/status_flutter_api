import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { UserEntity } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity('news_feeds')
export class NewsFeedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(255)
  content: string;

  @Column()
  date: Date;

  @Column()
  @Exclude({ toPlainOnly: true })
  user_id: number;

  @Column({ default: 0 })
  like_amount: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  likedBy: any;
}