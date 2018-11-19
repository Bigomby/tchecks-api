import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { promisify } from 'util';

import { JwtPayload } from 'modules/auth/interfaces/jwt-payload.interface';
import { UsersService } from 'modules/users/users.service';
import { UserEntity } from 'modules/users/user.entity';
import { IUser } from 'modules/users/interfaces/user.interface';

const comparePasswordAsync = promisify(bcrypt.compare);

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
  ) {}

  public async createToken(email: string, password: string) {
    const user = await this.users.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await comparePasswordAsync(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return { token: this.jwtService.sign({ id: user.id }), userId: user.id };
  }

  public createApiKey(id: string): string {
    return this.jwtService.sign({ id });
  }

  public verify(token: string): JwtPayload {
    return this.jwtService.verify(token);
  }
}
