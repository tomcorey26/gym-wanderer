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
import { Alert } from '../entity/Alert';
import { User } from '../entity/User';
import { Reviews } from '../entity/Reviews';
import { getConnection } from 'typeorm';

@Resolver()
export class ReviewResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createReview(
    @Ctx() { payload }: MyContext,
    @Arg('gymId') gymId: string,
    @Arg('rating') rating: 1 | 2 | 3 | 4 | 5,
    @Arg('text') text: string
  ) {
    try {
      const memberId = payload!.userId;
      await Reviews.create({
        creatorId: memberId,
        rating,
        text,
        gymId,
      }).save();

      const reviewedGym = await Gyms.findOne(gymId);
      const member = await User.findOne(memberId);

      await Alert.create({
        message: `${member?.first_name} ${member?.last_name} has left a review for your gym`,
        userId: reviewedGym?.ownerId,
        link: `/gyms/${reviewedGym?.id}`,
      }).save();
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async deleteReview(@Arg('reviewId') reviewId: number) {
    try {
      await getConnection().query(`delete from reviews where id =${reviewId};`);
    } catch (err) {
      console.log('err', err);
      return false;
    }

    return true;
  }

  @Query(() => [Reviews], { nullable: true })
  async gymReviews(@Arg('gymId', { nullable: true }) gymId: string) {
    return await Reviews.find({
      where: { gymId },
      relations: ['creator', 'gym'],
      order: { date_created: 'DESC' },
    });
  }

  @Query(() => [Reviews], { nullable: true })
  async userReviews(@Arg('userId') userId: string) {
    const reviews = await Reviews.find({
      where: { creatorId: userId },
      relations: ['creator', 'gym'],
    });
    return reviews;
  }
}
