import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getManager } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return (object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueEmailConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsUniqueEmail', async: true })
export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
  public validate = async (value: any, args: ValidationArguments) => {
    const entityManager = getManager();
    const field = args.property;
    const entity = await entityManager
      .createQueryBuilder(UserEntity, 'entity')
      .where(`entity.${field} = :value`, { value })
      .getOne();
    return !entity;
  };
}