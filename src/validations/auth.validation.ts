import { IsNotEmpty } from 'class-validator';
import { MessageConstant } from '../constants/message.constant';

export class AuthValidation {
  @IsNotEmpty({ message: MessageConstant.required_email })
  email: string;

  @IsNotEmpty({ message: MessageConstant.required_password })
  password: string;
}