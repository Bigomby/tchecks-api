import { Injectable, UseInterceptors } from '@nestjs/common';
import { Repository, FindManyOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ITeacher } from 'modules/teachers/interfaces/teacher.interface';
import { Teacher } from 'modules/teachers/teacher.entity';
import { User } from 'modules/users/user.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher) private readonly db: Repository<Teacher>,
  ) {}

  public async create(user: User, template: ITeacher): Promise<ITeacher> {
    const teacher = new Teacher();
    teacher.name = template.name;
    teacher.code = template.code;
    teacher.user = user;

    await this.db.save(teacher);
    return teacher;
  }

  public async find(options: FindManyOptions<Teacher>): Promise<ITeacher[]> {
    return this.db.find(options);
  }
}
