import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('int')
  message: string;

  @Field()
  @Column('boolean')
  link: string;

  @Field()
  @Column('boolean')
  isActive: boolean;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.alerts)
  user: User;
}
