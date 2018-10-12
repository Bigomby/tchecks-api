import { Teacher } from 'modules/teachers/interfaces/teacher.iterface';

export interface Entry {
  id?: string;
  timestamp?: number;
  teacher?: Teacher;
}
