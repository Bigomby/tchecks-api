import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeachersController } from 'modules/teachers/teachers.controller';
import { TeachersService } from 'modules/teachers/teachers.service';
import { Teacher } from 'modules/teachers/teacher.entity';
import { UsersModule } from 'modules/users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Teacher])],
  providers: [TeachersService],
  controllers: [TeachersController],
})
export class TeachersModule {}
