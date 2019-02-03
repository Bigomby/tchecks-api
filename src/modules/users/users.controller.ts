import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { UsersService } from 'modules/users/users.service';
import { IUser } from 'modules/users/interfaces/user.interface';
import { CreateUserDto } from 'modules/users/dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiUseTags('users')
  public create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.usersService.create(createUserDto);
  }
}
