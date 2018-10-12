import { Controller } from '@nestjs/common';
import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

import { AuthService } from 'modules/auth/auth.service';
import { IUser } from 'modules/users/interfaces/user.interface';
import { CreateUserDto } from 'modules/users/dtos/create-user.dto';
import { LoginDto } from 'modules/auth/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() { email, password }: LoginDto) {
    return this.authService.createToken(email, password);
  }
}
