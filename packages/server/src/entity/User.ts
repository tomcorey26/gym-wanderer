import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Preferences } from './Preferences';
import { Gyms } from './Gym';
import { Reviews } from './Reviews';
import { Membership } from './Membership';
import { Alert } from './Alert';

//field is from type grapql so we can get graphql types
//@ column is from typeorm, you put in postgres types
@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('text')
  first_name: string;

  @Field()
  @Column('text')
  last_name: string;

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Field()
  @Column({ length: '30', unique: true })
  username: string;

  @Column('text')
  password: string;

  @Field({ nullable: true })
  @Column('date', { nullable: true })
  birthday?: string;

  @Field()
  @Column('text')
  photo_url: string;

  @Column('int', { default: 0 })
  tokenVersion: number;

  @Field(() => Preferences)
  @OneToOne(() => Preferences)
  @JoinColumn()
  preferences: Preferences;

  @Field(() => Gyms, { nullable: true })
  @OneToOne(() => Gyms)
  @JoinColumn()
  gym: Gyms;

  @Field(() => [Reviews], { nullable: true })
  @OneToMany(() => Reviews, (review) => review.creator)
  reviews: Reviews[];

  @Field(() => [Membership], { nullable: true })
  @OneToMany(() => Membership, (membership) => membership.member)
  memberships: Membership[];

  @Field(() => [Alert], { nullable: true })
  @OneToMany(() => Alert, (alert) => alert.user)
  alerts: Alert[];
}
