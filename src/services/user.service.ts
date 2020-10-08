import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { base_url } from '../constants/api.constant';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.repo.find();
    return users.map(user => {
      delete user.password;
      return user;
    });
  }

  async getUser(id: number): Promise<UserEntity> {
    const user = await this.repo.findOne(id);
    if (user == undefined) throw 'User not found';
    delete user.password;
    return user;
  }

  async createUser(user: UserEntity, file: any): Promise<UserEntity> {
    if (file != undefined) user.profile_url = `${base_url}user_profile/${file.filename}`;
    user.password = await bcrypt.hash(user.password, 10);
    const saved = await this.repo.save(user);
    delete saved.password;
    return saved;
  }
}
