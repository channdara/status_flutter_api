import { NewsFeedEntity } from '../entities/news.feed.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedUpdateValidation } from '../validations/feed.update.validation';
import { MessageConstant } from '../constants/message.constant';
import { CommentEntity } from '../entities/comment.entity';

@Injectable()
export class NewsFeedService {
  constructor(
    @InjectRepository(NewsFeedEntity) private repo: Repository<NewsFeedEntity>,
    @InjectRepository(CommentEntity) private cmtRepo: Repository<CommentEntity>,
  ) {
  }

  async postNewsFeed(body: NewsFeedEntity, req: any): Promise<NewsFeedEntity> {
    body.date = new Date();
    body.user_id = req.user.id;
    const result = await this.repo.save(body);
    return await this.repo.findOne(result.id, { relations: ['user', 'likes', 'comments'] }).then(res => {
      res.like_amount = res.likes.length;
      res.comment_amount = res.comments.length;
      return res;
    });
  }

  async getAllNewsFeed(id: number): Promise<NewsFeedEntity[]> {
    const results = await this.repo.find({
      relations: ['user', 'likes', 'comments'],
      order: { date: 'DESC' },
    });
    return results.map(res => {
      res.like_amount = res.likes.length;
      res.comment_amount = res.comments.length;
      res.is_liked = res.likes.find(value => value.id == id) != undefined;
      return res;
    });
  }

  async getMyNewsFeed(id: number, req: any): Promise<NewsFeedEntity[]> {
    const results = await this.repo.find({
      relations: ['user', 'likes', 'comments'],
      where: { user_id: id },
      order: { date: 'DESC' },
    });
    return results.map(res => {
      res.like_amount = res.likes.length;
      res.comment_amount = res.comments.length;
      res.is_liked = res.likes.find(value => value.id == req.user.id) != undefined;
      return res;
    });
  }

  async getNewsFeed(id: number): Promise<NewsFeedEntity> {
    const feed = await this.repo.findOne(id, { relations: ['user'] });
    if (feed == undefined) throw MessageConstant.not_found_news_feed;
    return feed;
  }

  async updateNewsFeed(id: number, body: FeedUpdateValidation, req: any): Promise<NewsFeedEntity> {
    const feed = await this.repo.findOne(id);
    if (feed == undefined) throw MessageConstant.not_found_news_feed;
    if (req.user.id !== feed.user_id) throw MessageConstant.cannot_update_news_feed;
    feed.content = body.content;
    return await this.repo.save(feed);
  }

  async deleteNewsFeed(id: number, req: any): Promise<NewsFeedEntity> {
    const feed = await this.repo.findOne(id, { relations: ['user', 'likes', 'comments'] });
    if (feed == undefined) throw MessageConstant.not_found_news_feed;
    if (req.user.id !== feed.user_id) throw MessageConstant.cannot_delete_news_feed;
    if (feed.comments.length > 0) await this.cmtRepo.remove(feed.comments);
    if (feed.likes.length > 0) {
      feed.likes.splice(0, feed.likes.length);
      await this.repo.save(feed);
    }
    return await this.repo.remove(feed);
  }

  async likeOrUnlikeNewsFeed(id: number, req: any): Promise<any> {
    const newsFeed = await this.repo.findOne(id, { relations: ['likes'] });
    const liked = newsFeed.likes.find(value => value.id == req.user.id);
    if (liked == undefined) {
      delete req.user.jti;
      delete req.user.iat;
      newsFeed.likes.push(req.user);
    } else {
      const index = newsFeed.likes.findIndex(value => value.id == req.user.id);
      newsFeed.likes.splice(index, 1);
    }
    return await this.repo.save(newsFeed);
  }
}