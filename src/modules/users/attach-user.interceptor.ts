import { createParamDecorator } from '@nestjs/common';
import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';

import { UsersService } from 'modules/users/users.service';
import { JwtPayload } from 'modules/auth/interfaces/jwt-payload.interface';

@Injectable()
export class AttachUserInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {}

  public async intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { authorization }: { authorization: string } = request.headers;
    const [__, jwtEncodedToken] = authorization.split('Bearer ');
    const { id } = jwt.decode(jwtEncodedToken) as JwtPayload;
    request.user = await this.usersService.findById(id);

    return call$.pipe(tap((o: { user: string }) => delete o.user));
  }
}

export const UserEntity = createParamDecorator((data, req) => {
  return req.user;
});
