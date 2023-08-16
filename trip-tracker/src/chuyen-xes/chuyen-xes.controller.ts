import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChuyenXesService } from './chuyen-xes.service';
import { CreateChuyenXDto } from './dto/create-chuyen-x.dto';
import { UpdateChuyenXDto } from './dto/update-chuyen-x.dto';

@Controller('chuyen-xes')
export class ChuyenXesController {
  constructor(private readonly chuyenXesService: ChuyenXesService) {}

  @Post()
  create(@Body() createChuyenXDto: CreateChuyenXDto) {
    return this.chuyenXesService.create(createChuyenXDto);
  }

  @Get()
  findAll() {
    return this.chuyenXesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chuyenXesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChuyenXDto: UpdateChuyenXDto) {
    return this.chuyenXesService.update(+id, updateChuyenXDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chuyenXesService.remove(+id);
  }
}
