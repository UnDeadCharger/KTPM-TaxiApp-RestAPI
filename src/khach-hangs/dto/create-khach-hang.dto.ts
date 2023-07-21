import { ApiProperty } from '@nestjs/swagger';

export class CreateKhachHangDto {
  //API Property
  @ApiProperty({ required: false })
  hoTen?: string;

  soDienThoai: string;

  @ApiProperty({ required: false })
  diaChi?: string;

  @ApiProperty({ required: false })
  toaDoGPS?: string;

  @ApiProperty({ required: false })
  isRegistered?: boolean = false;

  @ApiProperty({ required: false })
  isVIP?: boolean = false;
}
