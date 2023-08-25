import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SignInKhachHangDto } from './dto/signInKhachHang.dto';
import { KhachHangsService } from 'src/khach-hangs/khach-hangs.service';
import { TaiXeService } from 'src/tai-xe/tai-xe.service';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';

@Controller('auth')
@ApiTags('auth')
@UseFilters(PrismaClientExceptionFilter)
export class AuthController {
  constructor(
    private authService: AuthService,
    private khachHangService: KhachHangsService,
    private TaiXeService: TaiXeService,
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

  @UseGuards(AccessTokenGuard)
  @Get('profileKhachHang')
  @ApiBearerAuth('jwt')
  getProfileKH(@Request() req) {
    console.log(req);
    return this.khachHangService.findOneByPhoneNum(req.user.sub);
  }

  @UseGuards(AccessTokenGuard)
  @Get('profileTaiXe')
  @ApiBearerAuth('jwt')
  getProfileTX(@Request() req) {
    console.log(req);
    return this.TaiXeService.findOneByPhoneNum(req.user.sub);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logoutKhangHang')
  logoutKH(@Req() req) {
    this.authService.logoutKhachHang(req.user.sub);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logoutTaiXe')
  logoutTX(@Req() req) {
    this.authService.logoutTaiXe(req.user.sub);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
