import { IsNotEmpty } from 'class-validator';
import { MessageConstant } from '../constants/message.constant';

export class UserUpdateValidation {
  @IsNotEmpty({ message: MessageConstant.required_gender })
  gender: number;

  @IsNotEmpty({ message: MessageConstant.required_name })
  name: string;

  @IsNotEmpty({ message: MessageConstant.required_phone_number })
  phone_number: string;
}