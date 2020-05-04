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
import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
@Entity()
export class Alert extends BaseEntity {
  @Field(() => Int)
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

  @Field()
  @CreateDateColumn()
  date_created: string;

  @PrimaryColumn()
  userId: string;
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.alerts)
  user: User;
}
