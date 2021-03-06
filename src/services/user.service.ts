import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { deleteFile, moveFile } from '../utils/file.util';
import { MessageConstant } from '../constants/message.constant';
import { UserUpdateValidation } from '../validations/user.update.validation';

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
      user.profile_url = `${process.env.API_URL}user_profile/${file.filename}`;
    }
    user.password = await bcrypt.hash(user.password, 10);
    return this.repo.save(user).then(res => {
      delete res.password;
      return res;
    });
  }

  async updateUser(body: UserUpdateValidation, file: any, req: any): Promise<UserEntity> {
    const user = await this.repo.findOne(req.user.id);
    if (file != undefined) {
      moveFile(file.path, `public/user_profile/${file.filename}`);
      user.profile_url = `${process.env.API_URL}user_profile/${file.filename}`;
    } else {
      if (user.profile_url != null) {
        deleteFile(user.profile_url.replace(process.env.API_URL, 'public/'));
        user.profile_url = null;
      }
    }
    user.gender = body.gender;
    user.name = body.name;
    user.phone_number = body.phone_number;
    return await this.repo.save(user);
  }
}
