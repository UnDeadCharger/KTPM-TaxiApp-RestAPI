import { Injectable } from '@nestjs/common';
import { CreateTaiXeDto } from './dto/create-tai-xe.dto';
import { UpdateTaiXeDto } from './dto/update-tai-xe.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaiXeService {
  constructor(private prisma: PrismaService) {}

  //Find by phone number

  create(createTaiXeDto: CreateTaiXeDto) {
    return this.prisma.taiXe.create({
      data: createTaiXeDto,
    });
  }

  findAll() {
    return this.prisma.taiXe.findMany({});
  }

  async findOneByPhoneNum(sdt: string) {
    return this.prisma.taiXe.findUnique({
      where: {
        soDienThoai: sdt,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.taiXe.findUnique({
      where: {
        idTaiXe: id,
      },
    });
  }

  update(id: string, updateTaiXeDto: UpdateTaiXeDto) {
    return this.prisma.taiXe.update({
      where: { idTaiXe: id },
      data: updateTaiXeDto,
    });
  }

  remove(id: string) {
    return this.prisma.taiXe.delete({ where: { idTaiXe: id } });
  }
}
