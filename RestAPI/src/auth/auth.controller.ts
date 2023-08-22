import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { SignInKhachHangDto } from './dto/signInKhachHang.dto';
import { KhachHangsService } from 'src/khach-hangs/khach-hangs.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private khachHangService: KhachHangsService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('loginKhachHang')
  @ApiCreatedResponse({ type: SignInKhachHangDto })
  signInKhachHang(@Body() signInDto: SignInKhachHangDto) {
    const { soDienThoai } = signInDto;
    return this.authService.signInKhachHang(soDienThoai);
  }

  @HttpCode(HttpStatus.OK)
  @Post('loginTaiXe')
  @ApiCreatedResponse({ type: SignInKhachHangDto })
  signInTaiXe(@Body() signInDto: SignInKhachHangDto) {
    //! DTO might need to be changed later
    const { soDienThoai } = signInDto;
    return this.authService.signInTaiXe(soDienThoai);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth('jwt')
  getProfile(@Request() req) {
    console.log(req)
    return this.khachHangService.findOneByPhoneNum(req.user.sub);
  }
}
