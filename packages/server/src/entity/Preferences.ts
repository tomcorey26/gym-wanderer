import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Preferences extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('boolean')
  yoga: boolean;

  @Field()
  @Column('boolean')
  crossfit: boolean;

  @Field()
  @Column('boolean')
  bodybuilding: boolean;

  @Field()
  @Column('boolean')
  parkour: boolean;

  @Field()
  @Column('boolean')
  general: boolean;

  @Field()
  @Column('boolean')
  boxing: boolean;
}
