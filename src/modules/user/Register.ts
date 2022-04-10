import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { RegisterInput } from './register/RegisterInput';

@Resolver()
export class RegisterResolver {
  @Query(() => String, { nullable: true })
  async hello() {
    return 'hello world';
  }

  @Mutation(() => User)
  async register(@Arg('input') { email, firstName, lastName, password }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    return await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();
  }
}
