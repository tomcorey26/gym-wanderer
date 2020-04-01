import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { User } from './User';
import { Field } from 'type-graphql';

@Entity()
export class Preferences {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  Yoga: boolean;

  @Field()
  @Column()
  Crossfit: boolean;

  @Field()
  @Column()
  Bodybuilding: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
