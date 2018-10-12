import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { promisify } from 'util';

import { User } from 'modules/users/user.entity';
import { IUser } from 'modules/users/interfaces/user.interface';

const hashPasswordAsync = promisify(bcrypt.hash);
const comparePasswordAsync = promisify(bcrypt.compare);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  public async create({ name, email, password }: IUser): Promise<User> {
    const user = new User();

    user.name = name;
    user.email = email;
    user.password = await hashPasswordAsync(password, 10);

    await this.users.save(user);
    delete user.password;

    return user;
  }

  public async findById(id: string): Promise<User> {
    const user = await this.users.findOne(id);
    delete user.password;

    return user;
  }

  public async validate(email: string, password: string): Promise<boolean> {
    const user = await this.users.findOne({ where: { email } });
    if (!user) {
      return false;
    }

    console.log(comparePasswordAsync(password, user.password));
    return true;
  }
}
