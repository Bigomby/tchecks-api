import { Controller, UseGuards } from '@nestjs/common';
import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from 'modules/users/users.service';
import { IUser } from 'modules/users/interfaces/user.interface';
import { CreateUserDto } from 'modules/users/dtos/create-user.dto';

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

  @Get(':id')
  @UseGuards(AuthGuard())
  public findById(@Param('id') id: string): Promise<IUser> {
    return this.usersService.findById(id);
  }

  @Put(':id')
  public update() {
    // TODO
  }

  @Delete(':id')
  public delete() {
    // TODO
  }
}
