import { IUser } from 'modules/users/interfaces/user.interface';
import { IEntry } from 'modules/entries/interfaces/entry.interface';

export interface ITeacher {
  id?: string;
  name?: string;
  code?: string;
  user?: IUser;
  entries?: Array<IEntry>;
}
