import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiImplicitParam } from '@nestjs/swagger';

import { User } from 'modules/users/user.decorator';
import { UserEntity } from 'modules/users/user.entity';
import { StationsService } from 'modules/stations/stations.service';
import { IStation } from 'modules/stations/interfaces/station.interface';
import { CreateStationDto } from 'modules/stations/dtos/create-station.dto';
import { UpdateStationDto } from 'modules/stations/dtos/update-station.dto';
import { AttachUser } from 'modules/users/interceptors/attach-user.interceptor';
import { OwnerGuard } from 'modules/auth/guards/owner.guard';

@Controller('/users/:userId/stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Post()
  @UseGuards(OwnerGuard)
  @UseInterceptors(AttachUser)
  @ApiUseTags('stations')
  @ApiImplicitParam({ name: 'userId' })
  @ApiBearerAuth()
  public async create(
    @User() user: UserEntity,
    @Body() station: CreateStationDto,
  ): Promise<IStation> {
    return await this.stationsService.create(user, station);
  }

  @Get()
  @UseGuards(OwnerGuard)
  @UseInterceptors(AttachUser)
  @ApiUseTags('stations')
  @ApiImplicitParam({ name: 'userId' })
  @ApiBearerAuth()
  public async find(@User() user: UserEntity): Promise<IStation[]> {
    return await this.stationsService.findByUser(user);
  }

  @Get(':stationId')
  @UseGuards(OwnerGuard)
  @UseInterceptors(AttachUser)
  @ApiUseTags('stations')
  @ApiImplicitParam({ name: 'userId' })
  @ApiBearerAuth()
  public async findById(
    @User() user: UserEntity,
    @Param('stationId') stationId: string,
  ): Promise<IStation> {
    return this.stationsService.findById(user, stationId);
  }

  @Put(':stationId')
  @UseGuards(OwnerGuard)
  @UseInterceptors(AttachUser)
  @ApiUseTags('stations')
  @ApiImplicitParam({ name: 'userId' })
  @ApiBearerAuth()
  public update(
    @User() user: UserEntity,
    @Param('stationId') stationId: string,
    @Body() station: UpdateStationDto,
  ) {
    this.stationsService.update(user, stationId, station);
  }

  @Delete(':stationId')
  @UseGuards(OwnerGuard)
  @UseInterceptors(AttachUser)
  @ApiUseTags('stations')
  @ApiImplicitParam({ name: 'userId' })
  @ApiBearerAuth()
  public delete(
    @User() user: UserEntity,
    @Param('stationId') stationId: string,
  ) {
    this.stationsService.delete(user, stationId);
  }
}
