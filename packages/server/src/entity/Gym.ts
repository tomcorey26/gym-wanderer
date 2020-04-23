import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Reviews } from './Reviews';
import { Coordinates, GymTypes } from '../Types';
import { Membership } from './Membership';

//adding "baseEntitiy" allows us to use crud operations
// for this table in the data base in our resolver
//foo
@ObjectType()
@Entity('gyms')
export class Gyms extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('text')
  gym_name: string;

  @Field()
  @Column('text')
  description: string;

  @Field()
  @Column({ type: 'money' })
  membership_cost: string;

  @Field()
  @Column({ unique: true })
  ownerId: string;

  @Field()
  @Column()
  location: string;

  @Field(() => [String])
  @Column('simple-array')
  equipment: string[];

  @Field(() => [String])
  @Column('simple-array')
  photo_urls: string[];

  @Field(() => Coordinates)
  @Column('json')
  coordinates: Coordinates;

  @Field(() => GymTypes) // it's very important
  @Column('enum', { name: 'type', enum: GymTypes })
  type: GymTypes;

  /*AUTO GENERATED STUFF */
  @Field()
  @Column('boolean', { default: false })
  isOpen: boolean;

  @Field()
  @CreateDateColumn()
  date_created: string;

  @Field(() => [Reviews], { nullable: true })
  @OneToMany(() => Reviews, (review) => review.gym)
  reviews: Reviews[];

  @Field(() => [Membership], { nullable: true })
  @OneToMany(() => Membership, (membership) => membership.gym)
  memberships: Membership[];
}
