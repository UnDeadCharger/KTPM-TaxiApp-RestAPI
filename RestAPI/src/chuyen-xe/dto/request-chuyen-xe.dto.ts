import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RequestChuyenXeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  idKhachHang: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  @ApiProperty({ required: false })
  trangThai?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  diemDon: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  diemTra: string;

  @IsOptional()
  @ApiProperty({ required: false })
  giaTien?: number;
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
