import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Teacher } from '../teachers/teacher.entity';

@Entity({ name: 'user' })
export class UserEntity {
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
