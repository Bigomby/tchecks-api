import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { UserEntity } from 'modules/users/user.entity';
import { Entry } from 'modules/entries/entry.entity';

@Entity({ name: 'station' })
export class StationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  apiKey: string;

  @ManyToOne(() => UserEntity, user => user.stations, { nullable: false })
  user: UserEntity;

  @OneToMany(() => Entry, entry => entry.station)
  entries: Array<Entry>;
}
