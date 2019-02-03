import { Controller, UseInterceptors, UseGuards } from '@nestjs/common';
import { Body, Param, Get, Put, Post, Delete } from '@nestjs/common';
import { ApiUseTags, ApiImplicitParam, ApiBearerAuth } from '@nestjs/swagger';

import { UserEntity } from 'modules/users/user.entity';
import { ITeacher } from 'modules/teachers/interfaces/teacher.interface';
import { CreateTeacherDto } from 'modules/teachers/dtos/create-teacher.dto';
import { UpdateTeacherDto } from 'modules/teachers/dtos/update-teacher.dto';
import { TeachersService } from 'modules/teachers/teachers.service';
import { AttachUser } from 'modules/users/interceptors/attach-user.interceptor';
import { User } from 'modules/users/user.decorator';
import { OwnerGuard } from 'modules/auth/guards/owner.guard';

@UseGuards(OwnerGuard)
@UseInterceptors(AttachUser)
@Controller('/users/:userId/teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @ApiUseTags('teachers')
  @ApiImplicitParam({ name: 'userId' })
  @ApiBearerAuth()
  public create(
    @User() user: UserEntity,
    @Body() createTeacherDto: CreateTeacherDto,
  ): Promise<ITeacher> {
    return this.teachersService.create(user, createTeacherDto);
  }

  @Get()
  @ApiUseTags('teachers')
  @ApiImplicitParam({ name: 'userId' })
  @ApiBearerAuth()
  public find(@User() user: UserEntity): Promise<ITeacher[]> {
    return this.teachersService.find({ where: { user: { id: user.id } } });
  }

  @Get(':teacherId')
  @ApiUseTags('teachers')
  @ApiImplicitParam({ name: 'userId' })
  @ApiBearerAuth()
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
  @ApiUseTags('teachers')
  @ApiImplicitParam({ name: 'userId' })
  @ApiBearerAuth()
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
  @ApiUseTags('teachers')
  @ApiImplicitParam({ name: 'userId' })
  @ApiBearerAuth()
  public delete(
    @User() user: UserEntity,
    @Param('teacherId') teacherId: string,
  ) {
    this.teachersService.delete({ id: teacherId, user: { id: user.id } });
  }
}
