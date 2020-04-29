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
} from 'type-graphql';
import { User } from '../entity/User';
import { hash, compare } from 'bcryptjs';
import { MyContext } from '../MyContext';
import { createRefreshToken, createAccessToken } from '../auth';
import { isAuth } from '../isAuth';
import { sendRefreshToken } from '../sendRefreshToken';
import { verify } from 'jsonwebtoken';
import { Preferences } from '../entity/Preferences';

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
    let user = await User.findOne({
      where: {
        id: payload!.userId,
      },
      relations: ['gym'],
    });
    return user;
  }

  // @Query(() => Boolean)
  // @UseMiddleware(isAuth)
  // async updateUser(@Ctx() { payload }: MyContext) {
  //   let user = await User.update({
  //     {
  //       id: payload!.userId,
  //     },
  //     {
  //       //stuff to update
  //     }
  //   });
  //   return user;
  // }

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
    console.log(username);
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
        photo_url,
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
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({
      where: { email },
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
