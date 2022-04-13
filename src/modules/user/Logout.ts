import { Ctx, Mutation, Resolver } from 'type-graphql';
import { MyContext } from '../../types/MyContext';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy((error) => {
        if (error) {
          console.log(error);
          return rej(false);
        }
        ctx.res.clearCookie('qid');
        return res(true);
      }),
    );
  }
}
