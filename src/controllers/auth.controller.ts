import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthValidation } from '../validations/auth.validation';
import { resError, resSuccess } from '../utils/response.util';
import { MessageConstant } from '../constants/message.constant';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {
  }

  @Post('/login')
  login(@Body() body: AuthValidation): any {
    return this.service.login(body)
      .then(data => resSuccess(MessageConstant.success_login, data))
      .catch(error => resError(error));
  }
}