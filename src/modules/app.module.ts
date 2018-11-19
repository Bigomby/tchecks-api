import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from 'modules/users/users.module';
import { EntriesModule } from 'modules/entries/entries.module';
import { AuthModule } from 'modules/auth/auth.module';
import { TeachersModule } from 'modules/teachers/teachers.module';
import { StationsModule } from 'modules/stations/stations.module';

const ormconfig = require('../../ormconfig.json');

ormconfig.host = process.env.DB_HOST || ormconfig.host;
ormconfig.port = process.env.DB_PORT || ormconfig.port;
ormconfig.username = process.env.DB_USER || ormconfig.username;
ormconfig.password = process.env.DB_PASSWORD || ormconfig.password;
ormconfig.database = process.env.DB_NAME || ormconfig.database;
ormconfig.synchronize = process.env.NODE_ENV !== 'production';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TeachersModule,
    EntriesModule,
    StationsModule,
    TypeOrmModule.forRoot(ormconfig),
  ],
})
export class AppModule {}
