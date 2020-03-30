import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int, ID } from 'type-graphql';

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
  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Field(() => Int)
  @Column('int', { nullable: true })
  age: number;

  @Column('int', { default: 0 })
  tokenVersion: number;
}
