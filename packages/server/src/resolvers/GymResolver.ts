import {
  Resolver,
  Mutation,
  UseMiddleware,
  ArgsType,
  Field,
  Args,
  Float,
  Query,
  Ctx,
} from 'type-graphql';
import { isAuth } from '../isAuth';
import { Gyms } from '../entity/Gym';
import { Coordinates } from '../Types';
import { MyContext } from '../MyContext';

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

  @Field(() => Float)
  membership_cost: number;

  @Field()
  ownerId: string;

  @Field()
  location: string;

  @Field(() => Coordinates)
  coordinates: Coordinates;
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
    const gymAlreadyMade = await Gyms.findOne({
      where: { ownerId: payload!.userId },
    });

    if (!!gymAlreadyMade) {
      console.log('gym already made');
      return false;
    }

    try {
      Gyms.insert(GymArgs);
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
    try {
      return await Gyms.findOne({ where: { ownerId: payload!.userId } });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Query(() => [Gyms])
  gyms() {
    return Gyms.find();
  }
}
