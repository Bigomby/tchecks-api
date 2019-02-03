import { Controller, UseInterceptors, UseGuards } from '@nestjs/common';
import { Body, Param, Headers, Get, Put, Post, Delete } from '@nestjs/common';
import {
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiImplicitParam,
  ApiBearerAuth,
  ApiImplicitHeader,
} from '@nestjs/swagger';

import { User } from 'modules/users/user.decorator';
import { UserEntity } from 'modules/users/user.entity';
import { IEntry } from 'modules/entries/interfaces/entry.interface';
import { TeachersService } from 'modules/teachers/teachers.service';
import { EntriesService } from 'modules/entries/entries.service';
import { OwnerGuard } from 'modules/auth/guards/owner.guard';
import { AttachUser } from 'modules/users/interceptors/attach-user.interceptor';
import { CreateEntryDto } from 'modules/entries/dtos/create-entry.dto';
import { UpdateEntryDto } from 'modules/entries/dtos/update-entry.dto';
import { StationsService } from 'modules/stations/stations.service';

@Controller()
export class EntriesController {
  constructor(
    private readonly entriesService: EntriesService,
    private readonly teachersService: TeachersService,
    private readonly stationsService: StationsService,
  ) {}

  @Get('/users/:userId/teachers/:teacherId/entries')
  @ApiUseTags('entries')
  @ApiImplicitParam({ name: 'userId' })
  @ApiBearerAuth()
  @UseGuards(OwnerGuard)
  @UseInterceptors(AttachUser)
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
  @ApiUseTags('entries')
  @ApiImplicitParam({ name: 'userId' })
  @ApiBearerAuth()
  @UseGuards(OwnerGuard)
  @UseInterceptors(AttachUser)
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

    return this.entriesService.create({ timestamp, detail }, teacher);
  }

  @Put('/users/:userId/entries/:entryId')
  @ApiUseTags('entries')
  @ApiImplicitParam({ name: 'userId' })
  @ApiBearerAuth()
  @UseGuards(OwnerGuard)
  @UseInterceptors(AttachUser)
  public async updateEntry(
    @User() user: UserEntity,
    @Param('entryId') entryId: string,
    @Body() entry: UpdateEntryDto,
  ) {
    await this.entriesService.update(entryId, entry, user.id);
  }

  @Delete('/users/:userId/entries/:entryId')
  @ApiUseTags('entries')
  @ApiImplicitParam({ name: 'userId' })
  @ApiBearerAuth()
  @UseGuards(OwnerGuard)
  @UseInterceptors(AttachUser)
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

  @Post('entries')
  @ApiUseTags('entries')
  @ApiImplicitHeader({ name: 'api_key', required: true })
  public async createEntryFromStation(
    @Body() dto: CreateEntryDto,
    @Headers('api_key') apiKey: string,
  ) {
    const [station] = await this.stationsService.find({
      where: { apiKey },
      relations: ['user', 'user.teachers'],
    });
    if (!station) {
      throw new UnauthorizedException();
    }

    const [teacher] = station.user.teachers.filter(
      ({ code }) => code === dto.code,
    );
    if (!teacher) {
      throw new UnauthorizedException();
    }

    return this.entriesService.create(dto, teacher, station);
  }
}
