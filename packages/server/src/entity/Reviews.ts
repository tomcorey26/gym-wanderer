import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Gyms } from './Gym';
import { Field, Int } from 'type-graphql';

@Entity()
export class Reviews {
  @PrimaryGeneratedColumn()
  id: number;

  // alter table ratings
  //  add constraint check_rating
  //  check (rating between 0 and 5);
  @Field(() => Int)
  @Column('float', {})
  rating: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.reviews)
  creator: User;

  @ManyToOne(() => Gyms, (gym) => gym.reviews)
  gym: Gyms;
}
