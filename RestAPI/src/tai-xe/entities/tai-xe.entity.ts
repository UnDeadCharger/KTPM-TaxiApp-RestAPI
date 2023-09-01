import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { TaiXe } from '@prisma/client';

export class TaiXeEntity implements TaiXe{
  @ApiProperty()
  idTaiXe: string;
  @ApiProperty({ required: false, nullable: true })
  hoTen: string;
  @ApiProperty()
  soDienThoai: string;
  @ApiProperty()
  idXe: string;
  @ApiProperty({ required: false, nullable: true })
  diaChi: string;
  @ApiProperty({ required: false, nullable: true })
  toaDoGPS: string;
  @ApiProperty()
  trangThai: string;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  twoFactorAuthenticationSecret: string;
}