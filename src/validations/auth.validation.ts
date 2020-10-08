import { IsNotEmpty } from 'class-validator';

export class AuthValidation {
  @IsNotEmpty({ message: 'Email address is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}