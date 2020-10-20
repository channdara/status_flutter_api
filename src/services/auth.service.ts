import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { AuthValidation } from '../validations/auth.validation';
import * as bcrypt from 'bcrypt';
import { MessageConstant } from '../constants/message.constant';
import { payload } from '../utils/response.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {
  }

  async login(body: AuthValidation): Promise<any> {
    const user = await this.repo.findOne({ where: { email: body.email } });
    if (user == undefined) throw MessageConstant.invalid_email;
    if (!(await bcrypt.compare(body.password, user.password))) throw MessageConstant.incorrect_password;
    return { 'access_token': await this.jwtService.sign(payload(user)), 'user': user };
  }

}