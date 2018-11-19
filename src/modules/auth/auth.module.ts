import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from 'modules/auth/auth.service';
import { AuthController } from 'modules/auth/auth.controller';
import { JwtStrategy } from 'modules/auth/strategies/jwt.strategy';
import { UserEntity } from 'modules/users/user.entity';
import { OwnerGuard } from 'modules/auth/guards/owner.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: { expiresIn: 3600 },
    }),
  ],
  providers: [AuthService, JwtStrategy, OwnerGuard],
  exports: [AuthService, OwnerGuard],
  controllers: [AuthController],
})
export class AuthModule {}
