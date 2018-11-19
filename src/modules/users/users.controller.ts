import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { Get, Post, Put, Delete, Body } from '@nestjs/common';

import { User } from 'modules/users/user.decorator';
import { UserEntity } from 'modules/users/user.entity';
import { UsersService } from 'modules/users/users.service';
import { IUser } from 'modules/users/interfaces/user.interface';
import { CreateUserDto } from 'modules/users/dtos/create-user.dto';
import { AttachUser } from 'modules/users/interceptors/attach-user.interceptor';
import { OwnerGuard } from 'modules/auth/guards/owner.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  public find() {
    // TODO
  }

  @UseGuards(OwnerGuard)
  @UseInterceptors(AttachUser)
  @Get(':userId')
  public findById(@User() user: UserEntity): IUser {
    return user;
  }

  @UseGuards(OwnerGuard)
  @UseInterceptors(AttachUser)
  @Put(':userId')
  public update() {
    // TODO
  }

  @UseGuards(OwnerGuard)
  @UseInterceptors(AttachUser)
  @Delete(':userId')
  public delete() {
    // TODO
  }
}
