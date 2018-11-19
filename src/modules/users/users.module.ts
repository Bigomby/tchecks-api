import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from 'modules/users/users.controller';
import { UsersService } from 'modules/users/users.service';
import { UserEntity } from 'modules/users/user.entity';
import { AuthModule } from 'modules/auth/auth.module';
import { AttachUser } from 'modules/users/interceptors/attach-user.interceptor';
import { RemoveUser } from 'modules/users/interceptors/remove-user.interceptor';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [AttachUser, RemoveUser, UsersService],
  exports: [AttachUser, UsersService],
})
export class UsersModule {}
