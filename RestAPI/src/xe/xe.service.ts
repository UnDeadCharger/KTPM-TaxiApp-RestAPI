import { Injectable } from '@nestjs/common';
import { CreateXeDto } from './dto/create-xe.dto';
import { UpdateXeDto } from './dto/update-xe.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaiXe } from '@prisma/client';

@Injectable()
export class XeService {
  constructor(private prisma: PrismaService) {}
  //CRUD
  create(createXeDto: CreateXeDto) {
    return this.prisma.xe.create({ data: createXeDto });
  }

  findAll() {
    return this.prisma.xe.findMany();
  }

  findAllXe7Cho() {
    return this.prisma.xe.findMany({ where: { loaiXe: '7 Cho' } });
  }

  findOne(id: string) {
    return this.prisma.xe.findUnique({ where: { idXe: id } });
  }

  findBienSoXe(BienSoXe: string) {
    return this.prisma.xe.findUnique({ where: { bienSoXe: BienSoXe } });
  }

  update(id: string, updateXeDto: UpdateXeDto) {
    return this.prisma.xe.update({
      where: { idXe: id },
      data: updateXeDto,
    });
  }

  remove(id: string) {
    return this.prisma.xe.delete({ where: { idXe: id } });
  }

  // removeByTaiXe(idTXe: TaiXe){
  //   return this.prisma.xe.deleteMany({where:{ownerTX: idTXe}})
  // }

}
