import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class checkKhachHangDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  soDienThoai: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  diemDon: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  diemTra: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  hoTen: string;
}

// model ChuyenXe {
//     idChuyenXe  String   @id @default(uuid())
//     idTaiXe     String
//     idKhachHang String
//     trangThai   String
//     diemDon     String
//     diemTra     String
//     giaTien     Float
//     gioHen      DateTime
//   }
