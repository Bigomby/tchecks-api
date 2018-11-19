import { ITeacher } from 'modules/teachers/interfaces/teacher.interface';
import { IStation } from 'modules/stations/interfaces/station.interface';

export interface IEntry {
  id?: string;
  timestamp?: number;
  detail?: string;
  created?: Date;
  teacher?: ITeacher;
  station?: IStation;
}
