import { IsNotEmpty } from 'class-validator';
import { MessageConstant } from '../constants/message.constant';

export class FeedUpdateValidation {
  @IsNotEmpty({ message: MessageConstant.required_content })
  content: string;
}