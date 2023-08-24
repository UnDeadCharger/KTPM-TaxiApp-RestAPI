import { Injectable } from '@nestjs/common';
import { CreateChuyenXeDto } from './dto/create-chuyen-xe.dto';
import { UpdateChuyenXeDto } from './dto/update-chuyen-xe.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChuyenXeService {
  constructor(private prisma: PrismaService) {}

  //RequestChuyenXe
  //requestCX() {}
  //UpdateChuyenXe
  create(createChuyenXeDto: CreateChuyenXeDto) {
    return this.prisma.chuyenXe.create({
      data: createChuyenXeDto,
    });
  }

  findAll() {
    return this.prisma.chuyenXe.findMany({});
  }

  findOne(id: string) {
    return this.prisma.chuyenXe.findUnique({
      where: {
        idChuyenXe: id,
      },
    });
  }

  update(id: string, updateChuyenXeDto: UpdateChuyenXeDto) {
    return this.prisma.chuyenXe.update({
      where: {
        idChuyenXe: id,
      },
      data: updateChuyenXeDto,
    });
  }

  remove(id: string) {
    return this.prisma.chuyenXe.delete({
      where: {
        idChuyenXe: id,
      },
    });
  }

  removeByKhachHang(idKH: string) {
    return this.prisma.chuyenXe.deleteMany({
      where: {
        idKhachHang: idKH,
      },
    });
  }
}
