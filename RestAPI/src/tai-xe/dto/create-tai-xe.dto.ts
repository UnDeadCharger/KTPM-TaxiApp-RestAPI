import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

export class CreateTaiXeDto {
  @ApiProperty({ required: false })
  idTaiXe?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  hoTen: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  soDienThoai: string;

  @IsString()
  @ApiProperty()
  idXe: string;

  @IsString()
  @ApiProperty({ required: false })
  toaDoGPS?: string;

  @IsString()
  @ApiProperty({ required: false })
  trangThai?: string;
}
