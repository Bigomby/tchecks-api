import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Entry } from 'modules/entries/entry.entity';
import { EntriesController } from 'modules/entries/entries.controller';
import { TeachersModule } from 'modules/teachers/teachers.module';
import { EntriesService } from 'modules/entries/entries.service';
import { StationsModule } from 'modules/stations/stations.module';

@Module({
  imports: [TeachersModule, StationsModule, TypeOrmModule.forFeature([Entry])],
  providers: [EntriesService],
  controllers: [EntriesController],
})
export class EntriesModule {}
