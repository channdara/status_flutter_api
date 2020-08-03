import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ResponseHandler } from '../handler/response.handler';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {
  }

  @Get()
  getUsers() {
    return this.service.getAllUsers().then(users => {
      return ResponseHandler.success('Get all users', users);
    }).catch(error => {
      return ResponseHandler.error(error);
    });
  }

  @Get(':id')
  getUser(@Param() param: any) {
    return this.service.getUser(param.id).then(user => {
      return ResponseHandler.success('Found user', user);
    }).catch(message => {
      return ResponseHandler.error(message);
    });
  }

  @Post()
  postUser(@Body() body: any) {
    console.log(body);
  }
}
