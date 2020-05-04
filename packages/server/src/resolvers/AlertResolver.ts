import {
  Arg,
  Resolver,
  Query,
  Mutation,
  UseMiddleware,
  Ctx,
  Int,
} from 'type-graphql';
import { Alert } from '../entity/Alert';
import { isAuth } from '../isAuth';
import { MyContext } from '../MyContext';

@Resolver()
export class AlertResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async toggleAlertOff(
    @Arg('alertId', () => Int) alertId: number,
    @Ctx() { payload }: MyContext
  ) {
    try {
      await Alert.update(
        { id: alertId, userId: payload!.userId! },
        { isActive: false }
      );
    } catch (err) {
      console.log('err', err);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async toggleAllAlertsOff(@Ctx() { payload }: MyContext) {
    try {
      await Alert.createQueryBuilder()
        .update(Alert)
        .set({ isActive: false })
        .where(' "userId" = :id', { id: payload!.userId! })
        .execute();
    } catch (err) {
      return false;
    }
    return true;
  }

  @Query(() => Boolean)
  @UseMiddleware(isAuth)
  async myAlerts(@Ctx() { payload }: MyContext) {
    try {
      await Alert.find({
        where: { userId: payload?.userId! },
        order: { date_created: 'DESC' },
      });
    } catch (err) {
      return false;
    }
    return true;
  }

  // @Query(() => [Membership], { nullable: true })
  // @UseMiddleware(isAuth)
  // async myMemberships(@Ctx() { payload }: MyContext) {
  //   const memberships = await Membership.find({
  //     where: { memberId: payload!.userId },
  //     relations: ['member', 'gym'],
  //   });

  //   return memberships;
  // }

  // @Query(() => [Gyms])
  // gyms() {
  //   return Gyms.find();
  // }
}
