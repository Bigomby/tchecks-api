import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StationsController } from 'modules/stations/stations.controller';
import { StationsService } from 'modules/stations/stations.service';
import { StationEntity } from 'modules/stations/station.entity';
import { AuthModule } from 'modules/auth/auth.module';
import { UsersModule } from 'modules/users/users.module';

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forFeature([StationEntity])],
  controllers: [StationsController],
  providers: [StationsService],
  exports: [StationsService],
})
export class StationsModule {}
