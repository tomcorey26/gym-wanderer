import { Field, Float, InputType, ObjectType } from 'type-graphql';

@ObjectType('Coordinates')
@InputType('CoordinatesInput')
export class Coordinates {
  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;
}
