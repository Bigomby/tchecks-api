import { Teacher } from 'modules/teachers/interfaces/teacher.interface';

export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  teachers?: Array<Teacher>;
}
