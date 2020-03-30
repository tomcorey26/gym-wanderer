import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Field } from 'type-graphql';
import { User } from './User';

//adding "baseEntitiy" allows us to use crud operations
// for this table in the data base in our resolver
//foo
@Entity()
export class Gyms {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('text')
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  rating: number;

  @Field()
  @Column()
  membership_cost: number;

  @Field()
  @Column()
  isOpen: boolean;

  @Column()
  date_created: string;

  @ManyToMany(() => User)
  @JoinTable()
  owners: User[];

  @ManyToMany(() => User)
  @JoinTable()
  members: User[];
}
