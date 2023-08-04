import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.taiXeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaiXeDto: UpdateTaiXeDto) {
    return this.taiXeService.update(+id, updateTaiXeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taiXeService.remove(+id);
  }
}
