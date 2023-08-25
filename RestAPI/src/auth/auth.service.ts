import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { KhachHangsService } from 'src/khach-hangs/khach-hangs.service';
import { TaiXeService } from 'src/tai-xe/tai-xe.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private khachHangsService: KhachHangsService,
    private taiXesService: TaiXeService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signInKhachHang(soDienThoai: string) {
    const user = await this.khachHangsService.findOneByPhoneNum(soDienThoai);
    /*if (user?.password !== pass) {
      throw new UnauthorizedException();
    }*/
    //const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    //return result;
    // const payload = { sub: user.soDienThoai };
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
    if (!user) throw new BadRequestException('User does not exist');
    const tokens = await this.getTokens(user.soDienThoai);
    await this.updateRefreshToken(user.soDienThoai, tokens.refreshToken);
    return tokens;
  }

  async signInTaiXe(soDienThoai: string) {
    const user = await this.taiXesService.findOneByPhoneNum(soDienThoai);
    /*if (user?.password !== pass) {
      throw new UnauthorizedException();
    }*/
    //const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    //return result;

    
    // const payload = { sub: user.soDienThoai };
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
    if (!user) throw new BadRequestException('User does not exist');
    const tokens = await this.getTokens(user.soDienThoai);
    await this.updateRefreshToken(user.soDienThoai, tokens.refreshToken);
    return tokens;
  }

  async logoutKhachHang(soDienThoai: string) {
    return this.khachHangsService.updateBySDT(soDienThoai, { refreshToken: null });
  }

  async logoutTaiXe(soDienThoai: string) {
    return this.taiXesService.updateBySDT(soDienThoai, { refreshToken: null });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async refreshTokens(soDienThoai: string, refreshToken: string) {
    const user = await this.khachHangsService.findOneByPhoneNum(soDienThoai);
    // const token = await this.getTokens(user.soDienThoai);
    if (!user || !user['refreshToken'])
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user['refreshToken'],
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.soDienThoai);
    await this.updateRefreshToken(user.soDienThoai, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(soDienThoai: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.khachHangsService.updateBySDT(soDienThoai, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(soDienThoai: string) {
    //this function used to accept 'username' as a parameter but i dont think it need it
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: soDienThoai,
          // username,
        },
        {
          secret: this.configService.get<string>('SECRETKEY_ACCESS'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: soDienThoai,
          // username,
        },
        {
          secret: this.configService.get<string>('SECRETKEY_REFRESH'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
