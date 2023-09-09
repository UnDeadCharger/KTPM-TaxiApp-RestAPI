import { Injectable } from '@nestjs/common';
import { CreateChuyenXesDto } from './dto/create-chuyen-xes.dto';
import { UpdateChuyenXesDto } from './dto/update-chuyen-xes.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChuyenXesService {
  constructor(private prisma: PrismaService) {}

  create(createChuyenXesDto: CreateChuyenXesDto) {
    return this.prisma.chuyenXe.create({
      data: createChuyenXesDto,
    });
  }

  findAll() {
    return `This action returns all chuyenXes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chuyenX`;
  }

  update(id: number, updateChuyenXDto: UpdateChuyenXesDto) {
    return `This action updates a #${id} chuyenX`;
  }

  remove(id: number) {
    return `This action removes a #${id} chuyenX`;
  }

  findRideExceptFinishStatus(){
    return this.prisma.chuyenXe.findMany({
      where:{
        NOT:[{
          trangThai:"Đã Hoàn Thành"
        }]
      }
    })    
  }

  getWaitingRide(){
    return this.prisma.chuyenXe.findMany({
      where:{
        trangThai:"Đang Chờ"
      }
    });
  }

  getOnGoingRide(){
    return this.prisma.chuyenXe.findMany({
      where:{
        trangThai:"Đang Diễn Ra"
      }
    });
  }
}
