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
    body.likedBy = {};
    return await this.repo.save(body);
  }

  async getAllNewsFeed(): Promise<NewsFeedEntity[]> {
    return await this.repo.find({ relations: ['user'] });
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
}