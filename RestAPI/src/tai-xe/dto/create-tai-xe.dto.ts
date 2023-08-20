import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

export class CreateTaiXeDto {
  // @IsString()
  // @IsNotEmpty()
  @ApiProperty({ required: false })
  idTaiXe?: string;

  // @IsString()
  // @IsNotEmpty()
  @ApiProperty()
  hoTen: string;

  // @IsString()
  // @IsNotEmpty()
  @ApiProperty()
  soDienThoai: string;

  // @IsString()
  idXe: string;

  // @IsString()
  @ApiProperty({ required: false })
  toaDoGPS?: string;

  // @IsString()
  @ApiProperty({ required: false })
  trangThai?: string;
}
