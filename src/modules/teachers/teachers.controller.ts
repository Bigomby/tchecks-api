import {
  Controller,
  UseInterceptors,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { Body, Param, Get, Put, Post, Delete } from '@nestjs/common';

import { UserEntity } from 'modules/users/user.entity';
import { ITeacher } from 'modules/teachers/interfaces/teacher.interface';
import { CreateTeacherDto } from 'modules/teachers/dtos/create-teacher.dto';
import { UpdateTeacherDto } from 'modules/teachers/dtos/update-teacher.dto';
import { TeachersService } from 'modules/teachers/teachers.service';
import { AttachUser } from 'modules/users/interceptors/attach-user.interceptor';
import { User } from 'modules/users/user.decorator';
import { Entry } from 'modules/entries/entry.entity';
import { IEntry } from 'modules/entries/interfaces/entry.interface';
import { OwnerGuard } from 'modules/auth/guards/owner.guard';

@UseGuards(OwnerGuard)
@UseInterceptors(AttachUser)
@Controller('/users/:userId/teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  public create(
    @User() user: UserEntity,
    @Body() createTeacherDto: CreateTeacherDto,
  ): Promise<ITeacher> {
    return this.teachersService.create(user, createTeacherDto);
  }

  @Get()
  public find(@User() user: UserEntity): Promise<ITeacher[]> {
    return this.teachersService.find({ where: { user: { id: user.id } } });
  }

  @Get(':teacherId')
  public async findById(
    @User() user: UserEntity,
    @Param('teacherId') teacherId: string,
  ): Promise<ITeacher> {
    const [teacher] = await this.teachersService.find({
      where: { id: teacherId, user: { id: user.id } },
    });

    return teacher;
  }

  @Put(':teacherId')
  public update(
    @User() user: UserEntity,
    @Param('teacherId') teacherId: string,
    @Body() teacher: UpdateTeacherDto,
  ) {
    this.teachersService.update(
      { id: teacherId, user: { id: user.id } },
      teacher,
    );
  }

  @Delete(':teacherId')
  public delete(
    @User() user: UserEntity,
    @Param('teacherId') teacherId: string,
  ) {
    this.teachersService.delete({ id: teacherId, user: { id: user.id } });
  }
}
