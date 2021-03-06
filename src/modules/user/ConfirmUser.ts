import { Resolver, Mutation, Arg } from 'type-graphql';

import { redis } from '../..//redis';
import { User } from '../../entity/User';
import { confirmUserPrefix } from './constants/redisPrefixes';

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg('token') token: string): Promise<boolean> {
    const userId = await redis.get(confirmUserPrefix + token);

    if (!userId) {
      return false;
    }

    User.update({ id: parseInt(userId) }, { confirmed: true });
    await redis.del(confirmUserPrefix + token);

    return true;
  }
}
