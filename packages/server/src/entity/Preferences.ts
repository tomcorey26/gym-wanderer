import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Preferences extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  yoga: boolean;

  @Field()
  @Column()
  crossfit: boolean;

  @Field()
  @Column()
  bodybuilding: boolean;

  @Field()
  @Column()
  parkour: boolean;

  @Field()
  @Column()
  general: boolean;

  @Field()
  @Column()
  boxing: boolean;
}
