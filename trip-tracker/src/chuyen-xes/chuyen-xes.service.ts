import { Injectable } from '@nestjs/common';
import { CreateChuyenXDto } from './dto/create-chuyen-x.dto';
import { UpdateChuyenXDto } from './dto/update-chuyen-x.dto';

@Injectable()
export class ChuyenXesService {
  create(createChuyenXDto: CreateChuyenXDto) {
    return 'This action adds a new chuyenX';
  }

  findAll() {
    return `This action returns all chuyenXes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chuyenX`;
  }

  update(id: number, updateChuyenXDto: UpdateChuyenXDto) {
    return `This action updates a #${id} chuyenX`;
  }

  remove(id: number) {
    return `This action removes a #${id} chuyenX`;
  }
}
