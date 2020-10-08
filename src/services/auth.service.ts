import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { AuthValidation } from '../validations/auth.validation';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>, private jwtService: JwtService) {
  }

  async login(body: AuthValidation): Promise<any> {
    const user = await this.repo.findOne({ where: { email: body.email } });
    if (user == undefined) throw 'This email does not belong to any user yet';
    if (!(await bcrypt.compare(body.password, user.password))) throw 'Password is incorrect';
    delete user.password;
    const payload = { id: user.id, email: user.email, name: user.name };
    return { 'access_token': await this.jwtService.sign(payload), 'user': user };
  }

}