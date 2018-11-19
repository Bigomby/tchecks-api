import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';

import { Teacher } from 'modules/teachers/teacher.entity';
import { StationEntity } from 'modules/stations/station.entity';

@Entity()
export class Entry extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  timestamp: number;

  @Column({ nullable: true })
  detail: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(() => Teacher, teacher => teacher.entries, { onDelete: 'CASCADE' })
  teacher: Teacher;

  @ManyToOne(() => StationEntity, station => station.entries)
  station: Teacher;
}
