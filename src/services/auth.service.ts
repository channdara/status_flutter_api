import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { AuthValidation } from '../validations/auth.validation';
import * as bcrypt from 'bcrypt';
import { api_secret_key } from '../constants/api.constant';
import * as redis from 'redis';
import JWTR from '@chantouchsek/jwt-redis';
import { MessageConstant } from '../constants/message.constant';
import { payload } from '../utils/response.util';

const jwtr = new JWTR(redis.createClient());

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {
  }

  async login(body: AuthValidation): Promise<any> {
    const user = await this.repo.findOne({ where: { email: body.email } });
    if (user == undefined) throw MessageConstant.invalid_email;
    if (!(await bcrypt.compare(body.password, user.password))) throw MessageConstant.incorrect_password;
    return { 'access_token': await jwtr.sign(payload(user), api_secret_key), 'user': user };
  }

}