import { Injectable } from '@nestjs/common';
import { CreateXeDto } from './dto/create-xe.dto';
import { UpdateXeDto } from './dto/update-xe.dto';

@Injectable()
export class XeService {
  create(createXeDto: CreateXeDto) {
    return 'This action adds a new xe';
  }

  findAll() {
    return `This action returns all xe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} xe`;
  }

  update(id: number, updateXeDto: UpdateXeDto) {
    return `This action updates a #${id} xe`;
  }

  remove(id: number) {
    return `This action removes a #${id} xe`;
  }
}
