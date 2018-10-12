import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from '../users/user.entity';
import { Entry } from '../entries/entry.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @ManyToOne(type => User, user => user.teachers)
  user: User;

  @OneToMany(type => Entry, entry => entry.teacher)
  entries: Array<Entry>;
}
