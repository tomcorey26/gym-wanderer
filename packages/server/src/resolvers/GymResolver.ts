import {
  Resolver,
  Mutation,
  UseMiddleware,
  ArgsType,
  Field,
  Args,
  Query,
  Ctx,
  Arg,
} from 'type-graphql';
import { isAuth } from '../isAuth';
import { Gyms } from '../entity/Gym';
import { Coordinates, GymTypes } from '../Types';
import { MyContext } from '../MyContext';
import { User } from '../entity/User';

//type-graphql can ususally infer the type of paramaters except for some exceptions
//like if the value might be null sometimes
// if null you have to pass third param to @arg
// {nullable:true}

@ArgsType()
class CreateGymArgs {
  @Field()
  gym_name: string;

  @Field()
  description: string;

  @Field(() => GymTypes) // it's very important
  type: GymTypes;

  @Field()
  membership_cost: string;

  @Field()
  ownerId: string;

  @Field()
  location: string;

  @Field(() => Coordinates)
  coordinates: Coordinates;

  @Field(() => [String])
  equipment: string[];

  @Field(() => [String])
  photo_urls: string[];
}

@Resolver()
export class GymResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createGym(
    @Ctx() { payload }: MyContext,
    @Args()
    GymArgs: CreateGymArgs
  ) {
    const gym = await Gyms.findOne({
      where: { ownerId: payload!.userId },
    });

    if (!!gym) {
      console.log('gym already made');
      return false;
    }

    try {
      const createdGym = await Gyms.create({ ...GymArgs });
      await createdGym.save();
      await User.update({ id: payload!.userId }, { gym: createdGym });
    } catch (err) {
      console.log(err);
      return false;
    }
    console.log(GymArgs);
    return true;
  }

  @Query(() => Gyms, { nullable: true })
  @UseMiddleware(isAuth)
  async myGym(@Ctx() { payload }: MyContext) {
    console.log('called my gym');
    try {
      return await Gyms.findOne({ where: { ownerId: payload!.userId } });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Query(() => User, { nullable: true })
  async gymDetails(@Arg('id', { nullable: true }) id?: string) {
    if (!id) return;

    return await User.findOne({
      where: {
        gym: id,
      },
      relations: ['gym'],
    });
  }

  @Query(() => [Gyms])
  gyms() {
    return Gyms.find();
  }
}
