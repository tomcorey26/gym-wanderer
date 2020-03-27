import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field()
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

  @Field()
  @Column('int', { nullable: true })
  age: number;

  @Column('int', { default: 0 })
  tokenVersion: number;
}
