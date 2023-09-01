import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { KhachHangsService } from '../../khach-hangs/khach-hangs.service';

@Injectable()
export class Jwt2faStrategy extends PassportStrategy(Strategy, 'jwt-2fa') {
  constructor(private readonly khachHangsService: KhachHangsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETKEY_ACCESS,
    });
  }

  async validate(payload: any) {
    // console.log(payload);
    // const user = await this.khachHangsService.findOneByPhoneNum(payload.soDienThoai);
    // return user;
    return payload
  }
}