import { PartialType } from '@nestjs/swagger';
import { CreateXeDto } from './create-xe.dto';

export class UpdateXeDto extends PartialType(CreateXeDto) {}
