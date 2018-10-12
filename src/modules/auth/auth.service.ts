import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { promisify } from 'util';

import { JwtPayload } from 'modules/auth/interfaces/jwt-payload.interface';
import { UsersService } from 'modules/users/users.service';
import { User } from 'modules/users/user.entity';
import { IUser } from 'modules/users/interfaces/user.interface';

const comparePasswordAsync = promisify(bcrypt.compare);

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  public async createToken(email: string, password: string): Promise<string> {
    const user = await this.users.findOne({ where: { email } });
    if (!user) {
      throw Error('Invalid credentials');
    }

    const isMatch = await comparePasswordAsync(password, user.password);
    if (!isMatch) {
      throw Error('Invalid credentials');
    }

    return this.jwtService.sign({ id: user.id });
  }

  public async validate({ id }: JwtPayload): Promise<boolean> {
    return !!(await this.users.findOne(id));
  }
}
