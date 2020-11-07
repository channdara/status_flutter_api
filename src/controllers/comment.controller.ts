import { CommentService } from '../services/comment.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CommentEntity } from '../entities/comment.entity';
import { resError, resSuccess } from '../utils/response.util';
import { MessageConstant } from '../constants/message.constant';
import { AuthGuard } from '@nestjs/passport';
import { auth_guard_type } from '../constants/api.constant';
import { CommentUpdateValidation } from '../validations/comment.update.validation';

@Controller('comment')
export class CommentController {
  constructor(private service: CommentService) {
  }

  @Post()
  @UseGuards(AuthGuard(auth_guard_type))
  postComment(@Body() body: CommentEntity, @Req() req: any): any {
    return this.service.postComment(body, req)
      .then(data => resSuccess(MessageConstant.success_set_data, data))
      .catch(error => resError(error.toString()));
  }

  @Get('/in_news_feed/:id')
  @UseGuards(AuthGuard(auth_guard_type))
  getAllComments(@Param() param: any): any {
    return this.service.getAllComments(param.id)
      .then(data => resSuccess(MessageConstant.success_get_data, data))
      .catch(error => resError(error.toString()));
  }

  @Put(':id')
  @UseGuards(AuthGuard(auth_guard_type))
  updateComment(@Param() param: any, @Body() body: CommentUpdateValidation, @Req() req: any): any {
    return this.service.updateComment(param.id, body, req)
      .then(data => resSuccess(MessageConstant.success_update_data, data))
      .catch(error => resError(error.toString()));
  }

  @Delete(':id')
  @UseGuards(AuthGuard(auth_guard_type))
  deleteComment(@Param() param: any, @Req() req: any): any {
    return this.service.deleteComment(param.id, req)
      .then(data => resSuccess(MessageConstant.success_remove_data, data))
      .catch(error => resError(error.toString()));
  }
}