import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { UserEntity } from '../users/user.entity';
import { Entry } from '../entries/entry.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @ManyToOne(_type => UserEntity, user => user.teachers, { nullable: false })
  user: UserEntity;

  @OneToMany(_type => Entry, entry => entry.teacher)
  entries: Array<Entry>;
}
