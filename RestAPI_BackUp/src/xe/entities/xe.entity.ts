import { ApiProperty } from '@nestjs/swagger';
import { Xe } from '@prisma/client';

export class XeEntity implements Xe {
  //API Property
  @ApiProperty()
  idXe: string;

  @ApiProperty()
  bienSoXe: string;

  @ApiProperty()
  hieuXe: string;

  @ApiProperty()
  loaiXe: string;
}
