import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class RegisterAccountDto {
  @IsString()
  @ApiProperty({required: true})
  soDienThoai: string;

}
