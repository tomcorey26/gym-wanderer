import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { User } from './User';
import { Reviews } from './Reviews';

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
  @Column()
  isOpen: boolean;

  @Field()
  @Column()
  date_created: string;

  @Field()
  @Column()
  ownerId: string;

  @ManyToMany(() => User)
  @JoinTable()
  owners: User[];

  @ManyToMany(() => User)
  @JoinTable()
  members: User[];

  @OneToMany(() => Reviews, (review) => review.gym)
  reviews: Reviews[];
}
