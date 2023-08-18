import { Injectable, UnauthorizedException } from '@nestjs/common';
import { KhachHangsService } from 'src/khach-hangs/khach-hangs.service';
import { TaiXeService } from 'src/tai-xe/tai-xe.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private khachHangsService: KhachHangsService,
    private taiXesService: TaiXeService,
    private jwtService: JwtService,
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
    const payload = { sub: user.soDienThoai };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
    const payload = { sub: user.soDienThoai };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
