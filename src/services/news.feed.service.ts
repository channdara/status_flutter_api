import { NewsFeedEntity } from '../entities/news.feed.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedUpdateValidation } from '../validations/feed.update.validation';
import { MessageConstant } from '../constants/message.constant';

@Injectable()
export class NewsFeedService {
  constructor(@InjectRepository(NewsFeedEntity) private repo: Repository<NewsFeedEntity>) {
  }

  async postNewsFeed(body: NewsFeedEntity, req: any): Promise<NewsFeedEntity> {
    body.date = new Date();
    body.user_id = req.user.id;
    return this.repo.save(body).then(res => {
      delete res.user_id;
      return res;
    });
  }

  async getAllNewsFeed(id: number): Promise<NewsFeedEntity[]> {
    const results = await this.repo.find({ relations: ['user', 'likes'] });
    return results.map(res => {
      res.like_amount = res.likes.length;
      res.is_liked = res.likes.find(value => value.id == id) != undefined;
      return res;
    });
  }

  async getMyNewsFeed(id: number): Promise<NewsFeedEntity[]> {
    return await this.repo.find({ relations: ['user'], where: { user_id: id } });
  }

  async getNewsFeed(id: number): Promise<NewsFeedEntity> {
    const feed = await this.repo.findOne(id, { relations: ['user'] });
    if (feed == undefined) throw MessageConstant.not_found_news_feed;
    return feed;
  }

  async updateNewsFeed(body: FeedUpdateValidation, req: any): Promise<NewsFeedEntity> {
    const feed = await this.repo.findOne(body.feed_id);
    if (feed == undefined) throw MessageConstant.not_found_news_feed;
    if (req.user.id !== feed.user_id) throw MessageConstant.cannot_update_news_feed;
    feed.content = body.content;
    return await this.repo.save(feed);
  }

  async deleteNewsFeed(id: number, req: any): Promise<NewsFeedEntity> {
    const feed = await this.repo.findOne(id);
    if (feed == undefined) throw MessageConstant.not_found_news_feed;
    if (req.user.id !== feed.user_id) throw MessageConstant.cannot_delete_news_feed;
    return await this.repo.remove(feed);
  }

  async likeOrUnlikeNewsFeed(id: number, req: any): Promise<any> {
    const newsFeed = await this.repo.findOne(id, { relations: ['likes'] });
    const liked = newsFeed.likes.find(value => value.id == req.user.id);
    if (liked == undefined) {
      delete req.user.jti;
      delete req.user.iat;
      newsFeed.likes = [req.user];
    } else {
      const index = newsFeed.likes.findIndex(value => value.id == req.user.id);
      newsFeed.likes.splice(index, 1);
    }
    return await this.repo.save(newsFeed);
  }
}