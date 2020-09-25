import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ResponseHandler } from '../handler/response.handler';
import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {
  }

  @Get()
  getUsers(): any {
    return this.service.getAllUsers()
      .then(users => ResponseHandler.success('Get all users success', users))
      .catch(error => ResponseHandler.error(error));
  }

  @Get(':id')
  getUser(@Param() param: any): any {
    return this.service.getUser(param.id)
      .then(user => ResponseHandler.success('Get user success', user))
      .catch(message => ResponseHandler.error(message));
  }

  @Post()
  postUser(@Body() body: User): any {
    return this.service.postUser(body)
      .then(user => ResponseHandler.success('Register user success', user))
      .catch(message => ResponseHandler.error(message));
  }
}
