import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Teacher } from '../teachers/teacher.entity';

@Entity()
export class Entry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  timestamp: number;

  @ManyToOne(type => Teacher, teacher => teacher.entries)
  teacher: Teacher;
}
