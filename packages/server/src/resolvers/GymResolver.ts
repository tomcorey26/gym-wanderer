import { Resolver, Mutation, Arg } from 'type-graphql';

//All the @ stuff
//this stuff specefies things in our schema
// so we can get auto complete
//and shit

//type-graphql can ususally infer the type of paramaters except for some exceptions
//like if the value might be null sometimes
// if null you have to pass third param to @arg
// {nullable:true}

@Resolver()
export class GymResolver {
  @Mutation(() => Boolean)
  createGym(@Arg('title', () => String) title: string) {
    console.log(title);
    return true;
  }
}
