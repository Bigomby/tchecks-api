import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';

import { UserEntity } from 'modules/users/user.entity';
import { AuthService } from 'modules/auth/auth.service';
import { StationEntity } from 'modules/stations/station.entity';
import { IStation } from 'modules/stations/interfaces/station.interface';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(StationEntity)
    private readonly db: Repository<StationEntity>,
    private readonly authService: AuthService,
  ) {}

  public async create(
    user: UserEntity,
    { name }: IStation,
  ): Promise<StationEntity> {
    const station = new StationEntity();
    station.name = name;
    station.apiKey = this.authService.createApiKey(station.id);
    station.user = user;

    await this.db.save(station);

    return station;
  }

  public async find(
    options: FindManyOptions<StationEntity>,
  ): Promise<StationEntity[]> {
    return await this.db.find(options);
  }

  public async findById(user: UserEntity, id: string): Promise<StationEntity> {
    const [station] = await this.db.find({
      where: { id, user: { id: user.id } },
    });

    return station;
  }

  public async findByUser(user: UserEntity): Promise<StationEntity[]> {
    return await this.db.find({ where: { user: { id: user.id } } });
  }

  public async update(user: UserEntity, id: string, station: IStation) {
    await this.db.update({ id, user: { id: user.id } }, station);
  }

  public async delete(user: UserEntity, id: string) {
    await this.db.delete({ id, user: { id: user.id } });
  }
}
