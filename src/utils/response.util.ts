import { classToPlain } from 'class-transformer';
import { UserEntity } from '../entities/user.entity';

export function resSuccess(message: string, data: any): any {
  return {
    'success': true,
    'message': message,
    'data': classToPlain(data),
  };
}

export function resError(message: string): any {
  return {
    'success': false,
    'message': message,
    'data': null,
  };
}

export function payload(user: UserEntity): any {
  return {
    id: user.id,
    email: user.email,
    gender: user.gender,
    name: user.name,
    phone_number: user.phone_number,
    profile_url: user.profile_url,
  };
}