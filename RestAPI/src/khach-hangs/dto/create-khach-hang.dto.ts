 import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateKhachHangDto {
  //API Property
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  hoTen?: string;

  @IsString()
  @ApiProperty({ required: false })
  soDienThoai: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  diaChi?: string;

  @IsString()
  @IsOptional() // NEED TO BE CHANGED
  @ApiProperty({ required: false })
  toaDoGPS?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  isRegistered?: boolean = false;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  isVIP?: boolean = false;


  //add refresh token
  @IsString()
  @ApiProperty({})
  refreshToken: string;

  @IsString()
  @ApiProperty({})
  twoFactorAuthenticationSecret: string;
}
