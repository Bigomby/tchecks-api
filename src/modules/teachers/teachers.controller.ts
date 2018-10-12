import { Controller, UseInterceptors, UseGuards } from '@nestjs/common';
import { Body, Get, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from 'modules/users/user.entity';
import { ITeacher } from 'modules/teachers/interfaces/teacher.interface';
import { CreateTeacherDto } from 'modules/teachers/dtos/create-teacher.dto';
import { TeachersService } from 'modules/teachers/teachers.service';
import { AttachUserInterceptor } from 'modules/users/attach-user.interceptor';
import { UserEntity } from 'modules/users/attach-user.interceptor';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly db: TeachersService) {}

  @Post()
  @UseGuards(AuthGuard())
  @UseInterceptors(AttachUserInterceptor)
  public create(
    @UserEntity() user: User,
    @Body() createTeacherDto: CreateTeacherDto,
  ): Promise<ITeacher> {
    return this.db.create(user, createTeacherDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @UseInterceptors(AttachUserInterceptor)
  public find(@UserEntity() user: User): Promise<ITeacher[]> {
    console.log(user);
    return this.db.find({});
  }
}
