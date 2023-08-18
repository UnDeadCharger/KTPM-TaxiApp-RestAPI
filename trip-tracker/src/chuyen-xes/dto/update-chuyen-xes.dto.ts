import { PartialType } from '@nestjs/swagger';
import { CreateChuyenXesDto } from './create-chuyen-xes.dto';

export class UpdateChuyenXesDto extends PartialType(CreateChuyenXesDto) {}
