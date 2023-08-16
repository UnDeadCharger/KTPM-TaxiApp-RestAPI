import { PartialType } from '@nestjs/swagger';
import { CreateChuyenXeDto } from './create-chuyen-xe.dto';

export class UpdateChuyenXeDto extends PartialType(CreateChuyenXeDto) {}
