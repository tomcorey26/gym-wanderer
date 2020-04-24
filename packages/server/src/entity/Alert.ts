import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Alert extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  message: string;

  @Field()
  @Column('text')
  link: string;

  @Field()
  @Column('boolean', { default: true })
  isActive: boolean;

  @PrimaryColumn()
  userId: string;
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.alerts)
  user: User;
}
