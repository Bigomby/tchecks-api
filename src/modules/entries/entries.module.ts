import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Entry } from 'modules/entries/entry.entity';
import { EntriesController } from 'modules/entries/entries.controller';
import { TeachersModule } from 'modules/teachers/teachers.module';
import { EntriesService } from 'modules/entries/entries.service';

@Module({
  imports: [TeachersModule, TypeOrmModule.forFeature([Entry])],
  providers: [EntriesService],
  controllers: [EntriesController],
})
export class EntriesModule {}
