import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Teacher } from '../teachers/teacher.entity';
import { StationEntity } from '../stations/station.entity';

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

  @OneToMany(() => Teacher, teacher => teacher.user)
  teachers: Array<Teacher>;

  @OneToMany(() => StationEntity, station => station.user)
  stations: Array<StationEntity>;
}
