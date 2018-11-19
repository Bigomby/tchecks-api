import { createParamDecorator } from '@nestjs/common';
import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';

import { UsersService } from 'modules/users/users.service';
import { JwtPayload } from 'modules/auth/interfaces/jwt-payload.interface';

@Injectable()
export class RemoveUser implements NestInterceptor {
  public async intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Promise<Observable<any>> {
    return call$.pipe(
      tap((res: { user: object }) => {
        if (res && res.user) {
          delete res.user;
        }

        return res;
      }),
    );
  }
}
