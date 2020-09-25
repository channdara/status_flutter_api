import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
  }

  async getAllUsers(): Promise<User[]> {
    return await this.repo.find();
  }

  async getUser(id: number): Promise<User> {
    const user = await this.repo.findOne(id);
    if (user == undefined) throw 'User not found';
    return user;
  }

  async postUser(user: any): Promise<User> {
    return await this.repo.save(user);
  }
}
