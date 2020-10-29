import { IsNotEmpty } from 'class-validator';
import { MessageConstant } from '../constants/message.constant';

export class CommentUpdateValidation {
  @IsNotEmpty({ message: MessageConstant.required_content })
  content: string;
}