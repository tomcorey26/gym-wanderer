import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field } from 'type-graphql';

//adding "baseEntitiy" allows us to use crud operations
// for this table in the data base in our resolver
@Entity()
export class Gym extends BaseEntity {
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
}
