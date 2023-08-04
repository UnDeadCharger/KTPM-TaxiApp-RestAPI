import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { XeService } from './xe.service';
import { CreateXeDto } from './dto/create-xe.dto';
import { UpdateXeDto } from './dto/update-xe.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('xe')

@ApiTags('xe')
export class XeController {
  constructor(private readonly xeService: XeService) {}

  @Post()
  create(@Body() createXeDto: CreateXeDto) {
    return this.xeService.create(createXeDto);
  }

  @Get()
  findAll() {
    return this.xeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.xeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateXeDto: UpdateXeDto) {
    return this.xeService.update(+id, updateXeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.xeService.remove(+id);
  }
}
