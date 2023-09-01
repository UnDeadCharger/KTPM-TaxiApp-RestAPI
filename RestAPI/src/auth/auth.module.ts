import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KhachHangsModule } from 'src/khach-hangs/khach-hangs.module';
import { TaiXeModule } from 'src/tai-xe/tai-xe.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { ConfigModule } from '@nestjs/config';
import { Jwt2faStrategy } from './strategies/jwt-2fa.strategy';

@Module({
  imports: [
    ConfigModule,
    KhachHangsModule,
    TaiXeModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600000s' }, //? Change to a longer time later
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, Jwt2faStrategy],
  exports: [AuthService],
})
export class AuthModule {}
