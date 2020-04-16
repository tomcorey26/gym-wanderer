import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { User } from './User';
import { Reviews } from './Reviews';
import { Coordinates } from '../Types';

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

  @Field(() => Int)
  @Column({ type: 'numeric', precision: 2 })
  membership_cost: number;

  @Field()
  @Column({ unique: true })
  ownerId: string;

  @Field()
  @Column()
  location: string;

  @Field(() => Coordinates)
  @Column('json')
  coordinates: Coordinates;

  /*AUTO GENERATED STUFF */
  @Field()
  @Column('boolean', { default: false })
  isOpen: boolean;

  @Field()
  @CreateDateColumn()
  date_created: string;

  @Field(() => User)
  @ManyToMany(() => User)
  @JoinTable()
  owners: User[];

  @Field(() => User)
  @ManyToMany(() => User)
  @JoinTable()
  members: User[];

  @Field(() => Reviews)
  @OneToMany(() => Reviews, (review) => review.gym)
  reviews: Reviews[];
}
