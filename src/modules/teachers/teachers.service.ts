import { Injectable } from '@nestjs/common';
import { Repository, FindManyOptions, FindConditions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ITeacher } from 'modules/teachers/interfaces/teacher.interface';
import { Teacher } from 'modules/teachers/teacher.entity';
import { UserEntity } from 'modules/users/user.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher) private readonly db: Repository<Teacher>,
  ) {}

  public async create(user: UserEntity, template: ITeacher): Promise<ITeacher> {
    const teacher = new Teacher();

    teacher.name = template.name;
    teacher.code = template.code;
    teacher.user = user;
    await this.db.save(teacher);

    delete teacher.user;

    return teacher;
  }

  public async find(options: FindManyOptions<Teacher>): Promise<Teacher[]> {
    return this.db.find(options);
  }

  public async update(options: FindConditions<Teacher>, teacher: ITeacher) {
    await this.db.update(options, teacher);
  }

  public async delete(options: FindConditions<Teacher>) {
    await this.db.delete(options);
  }
}
