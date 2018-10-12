import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from 'modules/auth/auth.service';
import { JwtPayload } from 'modules/auth/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
    });
  }

  async validate({ id }: JwtPayload): Promise<boolean> {
    const isValid = await this.authService.validate({ id });
    if (!isValid) {
      throw new UnauthorizedException();
    }

    return isValid;
  }
}
