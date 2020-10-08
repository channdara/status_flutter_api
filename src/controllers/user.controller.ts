import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { resError, resSuccess } from '../utils/response.util';
import { UserEntity } from '../entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file.util';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllUsers(): any {
    return this.service.getAllUsers()
      .then(users => resSuccess('Get all users success', users))
      .catch(error => resError(error));
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getUser(@Param() param: any): any {
    return this.service.getUser(param.id)
      .then(user => resSuccess('Get user success', user))
      .catch(message => resError(message));
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: 'public/user_profile',
      filename: editFileName,
      fileFilter: imageFileFilter,
    }),
  }))
  createUser(@Body() body: UserEntity, @UploadedFile() file: any): any {
    const user = JSON.parse(JSON.stringify(body));
    return this.service.createUser(user, file)
      .then(user => resSuccess('Register user success', user))
      .catch(message => resError(message));
  }
}