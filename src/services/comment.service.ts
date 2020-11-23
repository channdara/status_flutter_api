import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { MessageConstant } from '../constants/message.constant';
import { CommentUpdateValidation } from '../validations/comment.update.validation';
import { NewsFeedEntity } from '../entities/news.feed.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity) private repo: Repository<CommentEntity>,
    @InjectRepository(NewsFeedEntity) private feedRepo: Repository<NewsFeedEntity>) {
  }

  async postComment(body: CommentEntity, req: any): Promise<CommentEntity> {
    const feed = await this.feedRepo.findOne(body.news_feed_id);
    if (feed == undefined) throw MessageConstant.not_found_news_feed;
    body.date = new Date();
    body.user_id = req.user.id;
    return await this.repo.save(body).then(res => {
      delete res.user_id;
      return res;
    });
  }

  async getAllComments(newsFeedID: number): Promise<CommentEntity[]> {
    return await this.repo.find({
      relations: ['user'],
      where: { news_feed_id: newsFeedID },
      order: { date: 'DESC' },
    });
  }

  async updateComment(id: number, body: CommentUpdateValidation, req: any): Promise<CommentEntity> {
    const comment = await this.repo.findOne(id);
    if (comment == undefined) throw MessageConstant.not_found_comment;
    if (req.user.id != comment.user_id) throw MessageConstant.cannot_update_comment;
    comment.content = body.content;
    return await this.repo.save(comment);
  }

  async deleteComment(id: number, req: any): Promise<CommentEntity> {
    const comment = await this.repo.findOne(id, { relations: ['user', 'news_feed'] });
    if (comment == undefined) throw MessageConstant.not_found_comment;
    if (req.user.id == comment.news_feed.user_id) return await this.repo.remove(comment);
    if (req.user.id == comment.user_id) return await this.repo.remove(comment);
    throw MessageConstant.cannot_delete_comment;
  }
}