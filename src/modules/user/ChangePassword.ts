import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { redis } from '../../redis';
import { User } from '../../entity/User';
import { forgotPasswordPrefix } from './constants/redisPrefixes';
import { ChangePasswordInput } from './changePassword/ChangePasswordInput';
import bcrypt from 'bcryptjs';
import { MyContext } from 'src/types/MyContext';

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg('data') { token, password }: ChangePasswordInput,
    @Ctx() ctx: MyContext,
  ): Promise<User | null | undefined> {
    const userId = await redis.get(forgotPasswordPrefix + token);

    if (!userId) {
      return null;
    }

    const user = await User.findOne({ where: { id: parseInt(userId) } });

    if (!user) {
      return null;
    }

    await redis.del(forgotPasswordPrefix + token);

    user.password = await bcrypt.hash(password, 12);

    await user.save();

    ctx.req.session!.userId = user.id;

    return user;
  }
}
