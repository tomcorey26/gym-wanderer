import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
  InputType,
  Args,
  ArgsType,
} from 'type-graphql';
import { User } from '../entity/User';
import { hash, compare } from 'bcryptjs';
import { MyContext } from '../MyContext';
import { createRefreshToken, createAccessToken } from '../auth';
import { isAuth } from '../isAuth';
import { sendRefreshToken } from '../sendRefreshToken';
import { verify } from 'jsonwebtoken';
import { Preferences } from '../entity/Preferences';
import { Membership } from '../entity/Membership';
import { Alert } from '../entity/Alert';
import { Gyms } from '../entity/Gym';

@ObjectType()
class LoginResponse {
  @Field(() => User)
  user: User;

  @Field()
  accessToken: string;
}

@InputType()
class PreferencesInput {
  @Field()
  yoga: boolean;

  @Field()
  crossfit: boolean;

  @Field()
  bodybuilding: boolean;

  @Field()
  parkour: boolean;

  @Field()
  general: boolean;

  @Field()
  boxing: boolean;
}

@ArgsType()
class UserUpdateInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  birthday?: string;

  @Field({ nullable: true })
  photo_url?: string;

  @Field(() => PreferencesInput, { nullable: true })
  preferences?: PreferencesInput;
}

const userRelations = ['gym', 'preferences', 'memberships', 'alerts'];
@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hello world';
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    console.log(payload);
    return `your user id is: ${payload!.userId}`;
  }

  @Query(() => [User])
  users() {
    return User.find({ relations: userRelations });
  }

  @Query(() => User, { nullable: true })
  async getUser(@Arg('id') id: string) {
    if (!id) return null;
    let user = await User.findOne({
      where: {
        id,
      },
      relations: ['gym', 'preferences'],
    });
    return user;
  }

  @Query(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUser(@Ctx() { payload }: MyContext) {
    await User.delete({
      id: payload!.userId,
    });
    await Membership.delete({
      memberId: payload!.userId,
    });
    await Alert.delete({
      userId: payload!.userId,
    });
    await Gyms.delete({
      ownerId: payload!.userId,
    });
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateUser(
    @Ctx() { payload }: MyContext,
    @Args()
    userArgs: UserUpdateInput
  ) {
    try {
      await User.update(
        {
          id: payload!.userId,
        },
        {
          ...userArgs,
        }
      );
    } catch (err) {
      console.log('err', err);
      return false;
    }
    return true;
  }

  //either user or null
  @Query(() => User, { nullable: true })
  me(@Ctx() context: MyContext) {
    const authorization = context.req.headers['authorization'];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(' ')[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId, {
        relations: userRelations,
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Arg('first_name') first_name: string,
    @Arg('last_name') last_name: string,
    @Arg('preferences') preferences: PreferencesInput,
    @Arg('birthday', () => String, { nullable: true }) birthday?: string,
    @Arg('photo_url', () => String, { nullable: true }) photo_url?: string
  ) {
    const hashedPassword = await hash(password, 12);
    try {
      const prefs = Preferences.create({ ...preferences });
      await prefs.save();
      const user = User.create({
        username,
        email,
        password: hashedPassword,
        birthday,
        first_name,
        last_name,
        photo_url: photo_url
          ? photo_url
          : `https://robohash.org/${
              Math.random().toString(36).substring(2, 15) +
              Math.random().toString(36).substring(2, 15)
            }?set=set2`,
        preferences: prefs,
      });
      await user.save();
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({
      where: { username },
      relations: userRelations,
    });

    if (!user) {
      throw new Error('Could not find User');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error('bad password');
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    //sends back an empty cookie so the user
    sendRefreshToken(res, '');
    //can also use res.clearcookie
    return true;
  }
}
