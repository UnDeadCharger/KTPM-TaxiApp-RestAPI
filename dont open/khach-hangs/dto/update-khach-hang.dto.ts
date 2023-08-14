import { PartialType } from '@nestjs/swagger';
import { CreateKhachHangDto } from './create-khach-hang.dto';

export class UpdateKhachHangDto extends PartialType(CreateKhachHangDto) {}
