import { Injectable } from '@nestjs/common';
import { CreateTaiXeDto } from './dto/create-tai-xe.dto';
import { UpdateTaiXeDto } from './dto/update-tai-xe.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaiXeService {
  constructor(private prisma: PrismaService) {}

  create(createTaiXeDto: CreateTaiXeDto) {
    return 'This action adds a new taiXe';
  }

  findAll() {
    return `This action returns all taiXe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taiXe`;
  }

  update(id: number, updateTaiXeDto: UpdateTaiXeDto) {
    return `This action updates a #${id} taiXe`;
  }

  remove(id: number) {
    return `This action removes a #${id} taiXe`;
  }
}
