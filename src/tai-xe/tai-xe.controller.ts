import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { TaiXeService } from './tai-xe.service';
import { CreateTaiXeDto } from './dto/create-tai-xe.dto';
import { UpdateTaiXeDto } from './dto/update-tai-xe.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('tai-xe')

@ApiTags('tai-xe')
export class TaiXeController {
  constructor(private readonly taiXeService: TaiXeService) {}

  @Post()
  create(@Body() createTaiXeDto: CreateTaiXeDto) {
    return this.taiXeService.create(createTaiXeDto);
  }

  @Get()
  findAll() {
    return this.taiXeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const taixe = await this.taiXeService.findOne(id);

    if(!taixe){
      throw new NotFoundException(`Could not find taixe with id: ${id}`)
    }

    return taixe;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaiXeDto: UpdateTaiXeDto) {
    return this.taiXeService.update(id, updateTaiXeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taiXeService.remove(id);
  }
}
