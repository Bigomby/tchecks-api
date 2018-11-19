import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from 'modules/users/users.controller';
import { UsersService } from 'modules/users/users.service';
import { UserEntity } from 'modules/users/user.entity';
import { AuthModule } from 'modules/auth/auth.module';
import { AttachUserInterceptor } from 'modules/users/attach-user.interceptor';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [AttachUserInterceptor, UsersService],
  exports: [AttachUserInterceptor, UsersService],
})
export class UsersModule {}
