import { Injectable } from '@nestjs/common';
import { CreateKhachHangDto } from './dto/create-khach-hang.dto';
import { UpdateKhachHangDto } from './dto/update-khach-hang.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('khach-hangs')
export class KhachHangsService {
  constructor(private prisma: PrismaService) {}

  create(createKhachHangDto: CreateKhachHangDto) {
    return this.prisma.khachHang.create({ data: createKhachHangDto });
  }

  findAll() {
    return this.prisma.khachHang.findMany();
  }

  findAllRegistered() {
    return this.prisma.khachHang.findMany({ where: { isRegistered: true } });
  }

  findOne(id: string) {
    return this.prisma.khachHang.findUnique({ where: { idKhachHang: id } });
  }

  update(id: string, updateKhachHangDto: UpdateKhachHangDto) {
    return this.prisma.khachHang.update({
      where: { idKhachHang: id },
      data: updateKhachHangDto,
    });
  }

  remove(id: string) {
    return this.prisma.khachHang.delete({ where: { idKhachHang: id } });
  }
}
