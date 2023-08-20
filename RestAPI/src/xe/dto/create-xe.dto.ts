import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateXeDto {
  //API Property

  // @IsString()
  @ApiProperty({ required: false })
  bienSoXe: string;

  // @IsString()
  @ApiProperty({ required: false })
  hieuXe: string;

  // @IsString()
  @ApiProperty({ required: false })
  loaiXe: string;
}
