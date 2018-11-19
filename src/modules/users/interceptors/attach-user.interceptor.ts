import { createParamDecorator } from '@nestjs/common';
import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';

import { UsersService } from 'modules/users/users.service';
import { JwtPayload } from 'modules/auth/interfaces/jwt-payload.interface';

export const USER_PARAM = '__user-id-param__';

@Injectable()
export class AttachUser implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {}

  public async intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const handler = context.getHandler();

    const param = Reflect.getMetadata(USER_PARAM, handler) || 'userId';
    const userId = req.params[param];

    req.user = await this.usersService.findById(userId);

    return call$;
  }
}
