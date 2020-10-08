import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthStrategy } from '../strategies/auth.strategy';
import { jwt_secret_key } from '../constants/api.constant';

@Module({
  providers: [AuthService, AuthStrategy],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({ secret: jwt_secret_key }),
  ],
})
export class AuthModule {
}