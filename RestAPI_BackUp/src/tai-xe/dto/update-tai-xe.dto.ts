import { PartialType } from '@nestjs/swagger';
import { CreateTaiXeDto } from './create-tai-xe.dto';

export class UpdateTaiXeDto extends PartialType(CreateTaiXeDto) {}
