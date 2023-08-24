import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class SignInKhachHangDto {
  //API Property
  @IsString()
  @ApiProperty()
  soDienThoai: string;
}
