import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Gyms } from './Gym';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Reviews extends BaseEntity {
  @Field(() => Int)
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

  @Field()
  @CreateDateColumn()
  date_created: string;

  @PrimaryColumn()
  creatorId: string;
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.reviews)
  creator: User;

  @PrimaryColumn()
  gymId: string;
  @Field(() => Gyms)
  @ManyToOne(() => Gyms, (gym) => gym.reviews)
  gym: Gyms;
}
