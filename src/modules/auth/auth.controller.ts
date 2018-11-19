import { Controller } from '@nestjs/common';
import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

import { AuthService } from 'modules/auth/auth.service';
import { IUser } from 'modules/users/interfaces/user.interface';
import { CreateUserDto } from 'modules/users/dtos/create-user.dto';
import { LoginDto } from 'modules/auth/dtos/login.dto';
import { LoginResponseDto } from 'modules/auth/dtos/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.createToken(loginDto.email, loginDto.password);
  }
}
