import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

export class UpdateToaDoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  sdt?: string;

  @IsString()
  @ApiProperty({ required: false })
  toaDoGPS?: string;
}
