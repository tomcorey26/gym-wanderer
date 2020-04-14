import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Gyms } from './Gym';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Reviews {
  @PrimaryGeneratedColumn()
  id: number;

  // alter table ratings
  //  add constraint check_rating
  //  check (rating between 0 and 5);
  @Field(() => Int)
  @Column('int')
  rating: number;

  @Field()
  @Column({ length: '500' })
  text: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.reviews)
  creator: User;

  @Field(() => Gyms)
  @ManyToOne(() => Gyms, (gym) => gym.reviews)
  gym: Gyms;
}
