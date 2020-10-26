import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { NewsFeedService } from '../services/news.feed.service';
import { NewsFeedEntity } from '../entities/news.feed.entity';
import { AuthGuard } from '@nestjs/passport';
import { auth_guard_type } from '../constants/api.constant';
import { resError, resSuccess } from '../utils/response.util';
import { MessageConstant } from '../constants/message.constant';
import { FeedUpdateValidation } from '../validations/feed.update.validation';

@Controller('news_feed')
export class NewsFeedController {
  constructor(private service: NewsFeedService) {
  }

  @Post()
  @UseGuards(AuthGuard(auth_guard_type))
  postNewsFeed(@Body() body: NewsFeedEntity, @Req() req: any): any {
    return this.service.postNewsFeed(body, req)
      .then(data => resSuccess(MessageConstant.success_set_data, data))
      .catch(error => resError(error));
  }

  @Get()
  @UseGuards(AuthGuard(auth_guard_type))
  getAllNewsFeed(@Req() req: any): any {
    return this.service.getAllNewsFeed(req.user.id)
      .then(data => resSuccess(MessageConstant.success_get_data, data))
      .catch(error => resError(error));
  }

  @Get('/mine')
  @UseGuards(AuthGuard(auth_guard_type))
  getMyNewsFeed(@Req() req: any): any {
    return this.service.getMyNewsFeed(req.user.id)
      .then(data => resSuccess(MessageConstant.success_get_data, data))
      .catch(error => resError(error));
  }

  @Get(':id')
  @UseGuards(AuthGuard(auth_guard_type))
  getNewsFeed(@Param() param: any): any {
    return this.service.getNewsFeed(param.id)
      .then(data => resSuccess(MessageConstant.success_get_data, data))
      .catch(error => resError(error));
  }

  @Put()
  @UseGuards(AuthGuard(auth_guard_type))
  updateNewsFeed(@Body() body: FeedUpdateValidation, @Req() req: any): any {
    return this.service.updateNewsFeed(body, req)
      .then(data => resSuccess(MessageConstant.success_update_data, data))
      .catch(error => resError(error));
  }

  @Delete(':id')
  @UseGuards(AuthGuard(auth_guard_type))
  deleteNewsFeed(@Param() param: any, @Req() req: any): any {
    return this.service.deleteNewsFeed(param.id, req)
      .then(data => resSuccess(MessageConstant.success_remove_data, data))
      .catch(error => resError(error));
  }

  @Post('/like_or_unlike/:id')
  @UseGuards(AuthGuard(auth_guard_type))
  likeOrUnlikeNewsFeed(@Param() param: any, @Req() req: any): any {
    return this.service.likeOrUnlikeNewsFeed(param.id, req)
      .then(data => resSuccess(MessageConstant.success_update_data, data))
      .catch(error => resError(error));
  }
}