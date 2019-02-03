import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { AuthService } from 'modules/auth/auth.service';
import { LoginDto } from 'modules/auth/dtos/login.dto';
import { LoginResponseDto } from 'modules/auth/dtos/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiUseTags('auth')
  public async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.createToken(loginDto.email, loginDto.password);
  }
}
