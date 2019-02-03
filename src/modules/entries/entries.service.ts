import { Injectable } from '@nestjs/common';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

import { Teacher } from 'modules/teachers/teacher.entity';
import { Entry } from 'modules/entries/entry.entity';
import { IEntry } from 'modules/entries/interfaces/entry.interface';
import { StationEntity } from 'modules/stations/station.entity';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry) private readonly db: Repository<Entry>,
  ) {}

  public async create(
    template: IEntry,
    teacher: Teacher,
    station?: StationEntity,
  ): Promise<Entry> {
    if (!template.timestamp) {
      template.timestamp = Math.floor(new Date().getTime() / 1000);
    }

    const entry = new Entry();
    entry.timestamp = template.timestamp;
    entry.detail = template.detail;
    entry.teacher = teacher;
    entry.station = station;
    await this.db.save(entry);

    delete entry.station;
    delete entry.teacher.code;

    return entry;
  }

  public async findById(
    entryId: string,
    options?: FindOneOptions<Entry>,
    userId?: string,
  ): Promise<Entry> {
    if (!userId) {
      return await this.db.findOne({ where: { id: entryId }, ...options });
    }

    const entry = await this.db.findOne({
      ...options,
      where: { id: entryId },
      relations: ['teacher', 'teacher.user'],
    });

    if (!entry) {
      throw new NotFoundException();
    }

    if (entry.teacher.user.id !== userId) {
      throw new ForbiddenException();
    }

    return entry;
  }

  public async update(
    entryId: string,
    { detail, timestamp }: IEntry,
    userId?: string,
  ) {
    if (!userId) {
      await this.db.update(entryId, { detail, timestamp });
      return;
    }

    const entry = await this.findById(entryId, null, userId);
    entry.timestamp = timestamp || entry.timestamp;
    entry.detail = detail;

    this.db.update(entryId, entry);
  }

  public async delete(entryId: string) {
    await this.db.delete(entryId);
  }
}
