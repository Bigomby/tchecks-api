import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Teacher } from '../teachers/teacher.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(type => Teacher, teacher => teacher.user)
  teachers: Array<Teacher>;
}
