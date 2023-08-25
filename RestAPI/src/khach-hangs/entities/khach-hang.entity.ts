import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { KhachHang } from '@prisma/client';

export class KhachHangEntity implements KhachHang {
  @ApiProperty()
  idKhachHang: string;
  @ApiProperty({ required: false, nullable: true })
  hoTen: string;
  @ApiProperty()
  soDienThoai: string;
  @ApiProperty({ required: false, nullable: true })
  diaChi: string;
  @ApiProperty({ required: false, nullable: true })
  toaDoGPS: string;
  @ApiProperty()
  isRegistered: boolean;
  @ApiProperty()
  isVIP: boolean;
  @ApiProperty()
  refreshToken: string;
}
