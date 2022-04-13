import { Field, InputType } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import { IsEmailAlreadyExist } from './isEmailAlreadyExists';
import { PasswordMixin } from '../shared/PasswordInput';

@InputType()
export class RegisterInput extends PasswordMixin(class {}) {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'email already in use' })
  email: string;
}
