import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthValidation } from '../validations/auth.validation';
import { resError, resSuccess } from '../utils/response.util';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {
  }

  @Post('/login')
  login(@Body() body: AuthValidation): any {
    return this.service.login(body)
      .then(data => resSuccess('Login success', data))
      .catch(error => resError(error));
  }

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: any): any {
    return req.user;
  }
}