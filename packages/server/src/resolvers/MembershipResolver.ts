import {
  Mutation,
  UseMiddleware,
  Ctx,
  Arg,
  Resolver,
  Query,
} from 'type-graphql';
import { isAuth } from '../isAuth';
import { MyContext } from '../MyContext';
import { Gyms } from '../entity/Gym';
import { User } from '../entity/User';
import { Membership } from '../entity/Membership';

@Resolver()
export class MembershipResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinGym(
    @Ctx() { payload }: MyContext,
    @Arg('gymId') gymId: string,
    @Arg('end_date') end_date: number,
    @Arg('auto_renewal') auto_renewal: boolean
  ) {
    try {
      const userId = payload!.userId;

      const gym = await Gyms.findOne({
        where: { id: gymId },
      });
      const member = await User.findOne({
        where: { id: userId },
      });

      //create membership
      await Membership.create({
        end_date,
        gym,
        member,
        isAutoRenewalActive: auto_renewal,
      }).save();
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  @Query(() => [Membership], { nullable: true })
  @UseMiddleware(isAuth)
  async userMemberships(@Ctx() { payload }: MyContext) {
    let memberships = await Membership.find({
      where: { memberId: payload!.userId },
      relations: ['member', 'gym'],
    });
    console.log(memberships);

    return memberships;
  }

  // @Query(() => User, { nullable: true })
  // async gymDetails(@Arg('id', { nullable: true }) id?: string) {
  //   if (!id) return;

  //   return await User.findOne({
  //     where: {
  //       gym: id,
  //     },
  //     relations: ['gym'],
  //   });
  // }

  // @Query(() => [Gyms])
  // gyms() {
  //   return Gyms.find();
  // }
}
