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
import { Membership } from '../entity/Membership';
import { Gyms } from '../entity/Gym';
import { Alert } from '../entity/Alert';
import { User } from '../entity/User';

@Resolver()
export class MembershipResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinGym(
    @Ctx() { payload }: MyContext,
    @Arg('gymId') gymId: string,
    @Arg('end_date') end_date: number,
    @Arg('auto_renewal') auto_renewal: boolean,
    @Arg('payment') payment: number
  ) {
    try {
      const memberId = payload!.userId;
      await Membership.create({
        end_date,
        memberId,
        gymId,
        payment,
        isAutoRenewalActive: auto_renewal,
      }).save();

      const joinedGym = await Gyms.findOne(gymId);

      await Alert.create({
        message: `Congrats! You have joined ${joinedGym?.gym_name}`,
        userId: memberId,
        link: `/gyms/${joinedGym?.id}`,
      }).save();

      const member = await User.findOne(memberId);
      await Alert.create({
        message: `Congrats! ${member?.first_name} ${member?.last_name} has joined your gym`,
        userId: joinedGym?.ownerId,
        link: `/analytics`,
      }).save();
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  @Query(() => [Membership], { nullable: true })
  @UseMiddleware(isAuth)
  async myMemberships(@Ctx() { payload }: MyContext) {
    const memberships = await Membership.find({
      where: { memberId: payload!.userId },
      relations: ['member', 'gym'],
    });

    return memberships;
  }

  @Query(() => [Membership], { nullable: true })
  async userMemberships(@Arg('userId') userId: string) {
    const memberships = await Membership.find({
      where: { memberId: userId },
      relations: ['member', 'gym'],
    });

    return memberships;
  }

  @Query(() => [Membership], { nullable: true })
  async gymMemberships(@Arg('gymId', { nullable: true }) gymId: string) {
    return await Membership.find({
      where: { gymId },
      relations: ['member', 'gym'],
      order: { begin_date: 'DESC' },
    });
  }

  // @Query(() => [Gyms])
  // gyms() {
  //   return Gyms.find();
  // }
}
