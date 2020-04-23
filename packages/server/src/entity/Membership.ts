import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { User } from './User';
import { Gyms } from './Gym';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Membership extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field()
  @Column('boolean')
  isAutoRenewalActive: boolean;

  @Field()
  @Column('int')
  end_date: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.memberships)
  member: User;

  @Field(() => Gyms)
  @ManyToOne(() => Gyms, (gym) => gym.memberships)
  gym: Gyms;
}
