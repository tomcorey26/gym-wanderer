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
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Membership extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('boolean')
  isAutoRenewalActive: boolean;

  @Field()
  @Column('int')
  end_date: number;

  @Field()
  @CreateDateColumn()
  begin_date: string;
  //these two fields must be unique
  @PrimaryColumn()
  memberId: string;
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.memberships)
  member: User;

  @PrimaryColumn()
  gymId: string;
  @Field(() => Gyms)
  @ManyToOne(() => Gyms, (gym) => gym.memberships)
  gym: Gyms;
}
