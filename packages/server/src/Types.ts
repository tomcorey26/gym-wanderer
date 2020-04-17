import {
  Field,
  Float,
  InputType,
  ObjectType,
  registerEnumType,
} from 'type-graphql';

export enum GymTypes {
  yoga = 'yoga',
  crossfit = 'crossfit',
  bodybuilding = 'bodybuilding',
  parkour = 'parkour',
  general = 'general',
  boxing = 'boxing',
}

registerEnumType(GymTypes, {
  name: 'GymTypes', // this one is mandatory
  description: 'The types of gyms available on gym wanderer', // this one is optional
});

@ObjectType('Coordinates')
@InputType('CoordinatesInput')
export class Coordinates {
  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;
}
