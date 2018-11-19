import { Controller, UseInterceptors, UseGuards } from '@nestjs/common';
import { Body, Param, Get, Put, Post, Delete } from '@nestjs/common';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

import { User } from 'modules/users/user.decorator';
import { UserEntity } from 'modules/users/user.entity';
import { IEntry } from 'modules/entries/interfaces/entry.interface';
import { TeachersService } from 'modules/teachers/teachers.service';
import { EntriesService } from 'modules/entries/entries.service';
import { Entry } from 'modules/entries/entry.entity';
import { OwnerGuard } from 'modules/auth/guards/owner.guard';
import { AttachUser } from 'modules/users/interceptors/attach-user.interceptor';
import { CreateEntryDto } from 'modules/entries/dtos/create-entry.dto';
import { UpdateEntryDto } from 'modules/entries/dtos/update-entry.dto';

@Controller()
@UseGuards(OwnerGuard)
@UseInterceptors(AttachUser)
export class EntriesController {
  constructor(
    private readonly entriesService: EntriesService,
    private readonly teachersService: TeachersService,
  ) {}

  @Get('/users/:userId/teachers/:teacherId/entries')
  public async findEntries(
    @User() user: UserEntity,
    @Param('teacherId') teacherId: string,
  ): Promise<IEntry[]> {
    const [teacher] = await this.teachersService.find({
      where: { id: teacherId, user: { id: user.id } },
      relations: ['entries', 'entries.station'],
    });

    if (!teacher) {
      throw new NotFoundException();
    }

    return teacher.entries;
  }

  @Post('/users/:userId/teachers/:teacherId/entries')
  public async createEntry(
    @User() user: UserEntity,
    @Param('teacherId') teacherId: string,
    @Body() { timestamp, detail }: CreateEntryDto,
  ): Promise<IEntry> {
    const [teacher] = await this.teachersService.find({
      where: { id: teacherId, user: { id: user.id } },
    });

    if (!teacher) {
      throw new NotFoundException();
    }

    return this.entriesService.create(teacher, timestamp, detail);
  }

  @Put('/users/:userId/entries/:entryId')
  public async updateEntry(
    @User() user: UserEntity,
    @Param('entryId') entryId: string,
    @Body() entry: UpdateEntryDto,
  ) {
    await this.entriesService.update(entryId, entry, user.id);
  }

  @Delete('/users/:userId/entries/:entryId')
  public async deleteEntry(
    @User() user: UserEntity,
    @Param('entryId') entryId: string,
  ) {
    const entry = await this.entriesService.findById(entryId, {
      relations: ['teacher', 'teacher.user'],
    });
    if (!entry) {
      throw new NotFoundException();
    }
    if (entry.teacher.user.id !== user.id) {
      throw new ForbiddenException();
    }

    await this.entriesService.delete(entryId);
  }
}
