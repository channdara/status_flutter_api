import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsUniqueEmail } from '../utils/validator.util';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail({}, { message: 'Email address is invalid' })
  @IsNotEmpty({ message: 'Email address is required' })
  @IsUniqueEmail({ message: 'Email already existed, try another email or reset your password' })
  email: string;

  @Column()
  @IsNotEmpty({ message: 'Gender required' })
  gender: number;

  @Column()
  @IsNotEmpty({ message: 'Name required' })
  name: string;

  @Column()
  @IsNotEmpty({ message: 'Phone number required' })
  phone_number: string;

  @Column({ default: null })
  profile_url: string;

  @Column()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
