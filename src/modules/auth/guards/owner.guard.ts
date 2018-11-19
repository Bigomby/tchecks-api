import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { JwtPayload } from 'modules/auth/interfaces/jwt-payload.interface';
import { AuthService } from 'modules/auth/auth.service';

export const USER_PARAM_METADATA = '__user-id-param__';
export const DEFAULT_USER_PARAM = 'userId';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  public canActivate(context: ExecutionContext): boolean {
    const { params, headers } = context.switchToHttp().getRequest();

    this.checkHeaders(headers);
    const paramUserId = this.checkParams(context.getHandler(), params);
    const encodedToken = this.getToken(headers.authorization);

    try {
      const token = this.authService.verify(encodedToken);
      if (token.id !== paramUserId) {
        throw new UnauthorizedException();
      }

      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private checkParams(handler: any, params: { [key: string]: string }): string {
    const param =
      Reflect.getMetadata(USER_PARAM_METADATA, handler) || DEFAULT_USER_PARAM;
    const paramUserId = params[param];
    if (!paramUserId) {
      throw new InternalServerErrorException();
    }

    return paramUserId;
  }

  private checkHeaders(headers: { [key: string]: string }) {
    const authorization: string = headers['authorization'];
    if (!authorization) {
      throw new UnauthorizedException();
    }
  }

  private getToken(authorization: string): string {
    const [__, token] = authorization.split('Bearer ');
    if (!token) {
      throw new InternalServerErrorException();
    }

    return token;
  }
}
