import { Injectable } from '@nestjs/common';
import { CreateKhachHangDto } from './dto/create-khach-hang.dto';
import { UpdateKhachHangDto } from './dto/update-khach-hang.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class KhachHangsService {
  constructor(private prisma: PrismaService) {}

  //Register account to phone number
  async checkRegistered(soDienThoai: string) {
    const khachHang = await this.prisma.khachHang.findUnique({
      where: { soDienThoai: soDienThoai },
    });
    if (!khachHang) {
      return {
        status: 0,
        message: 'Phone number does not exist.',
      };
    }

    if (khachHang.isRegistered != true) {
      return {
        status: 1,
        message: 'Phone number is not registered.',
      };
    } else {
      return {
        status: 2,
        message: 'Phone number is registered.',
      };
    }
  }
  //Add new Khach Hang or Update Khach Hang Info
  async registerAccount(createKhachHangDto: CreateKhachHangDto) {
    //
    createKhachHangDto.isRegistered = true;
    return this.prisma.khachHang.upsert({
      where: { soDienThoai: createKhachHangDto.soDienThoai },
      update: createKhachHangDto,
      create: createKhachHangDto,
    });
  }

  //CRUD
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
