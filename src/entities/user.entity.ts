import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsUniqueEmail } from '../utils/validator.util';
import { MessageConstant } from '../constants/message.constant';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail({}, { message: MessageConstant.invalid_email })
  @IsNotEmpty({ message: MessageConstant.required_email })
  @IsUniqueEmail({ message: MessageConstant.unique_email })
  email: string;

  @Column()
  @IsNotEmpty({ message: MessageConstant.required_gender })
  gender: number;

  @Column()
  @IsNotEmpty({ message: MessageConstant.required_name })
  name: string;

  @Column()
  @IsNotEmpty({ message: MessageConstant.required_phone_number })
  phone_number: string;

  @Column({ default: null })
  profile_url: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  @IsNotEmpty({ message: MessageConstant.required_password })
  password: string;
}
