import { PartialType } from '@nestjs/mapped-types';
import { CreateChuyenXDto } from './create-chuyen-x.dto';

export class UpdateChuyenXDto extends PartialType(CreateChuyenXDto) {}
