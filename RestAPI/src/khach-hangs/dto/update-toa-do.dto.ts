import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateToaDoDto {
  @IsString()
  @ApiProperty({required: true})
  sdt: string;

  @IsString()
  @ApiProperty({required:true})
  toaDoGPS: string;
}
