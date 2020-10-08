import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {
}
