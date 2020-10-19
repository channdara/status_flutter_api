import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { base_url } from '../constants/api.constant';
import * as bcrypt from 'bcrypt';
import { moveFile } from '../utils/file.util';
import { MessageConstant } from '../constants/message.constant';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.repo.find();
  }

  async getUser(id: number): Promise<UserEntity> {
    const user = await this.repo.findOne(id);
    if (user == undefined) throw MessageConstant.not_found_user;
    return user;
  }

  async createUser(user: UserEntity, file: any): Promise<UserEntity> {
    if (file != undefined) {
      moveFile(file.path, `public/user_profile/${file.filename}`);
      user.profile_url = `${base_url}user_profile/${file.filename}`;
    }
    user.password = await bcrypt.hash(user.password, 10);
    return this.repo.save(user).then(res => {
      delete res.password;
      return res;
    });
  }
}
