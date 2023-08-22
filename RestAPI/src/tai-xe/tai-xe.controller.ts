import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseFilters } from '@nestjs/common';
import { TaiXeService } from './tai-xe.service';
import { CreateTaiXeDto } from './dto/create-tai-xe.dto';
import { UpdateTaiXeDto } from './dto/update-tai-xe.dto';
import { ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';
import { XeService } from 'src/xe/xe.service';
import { TaiXeEntity } from './entities/tai-xe.entity';
import { UpdateToaDoDto } from './dto/update-toa-do.dto';

@Controller('tai-xe')
@ApiTags('tai-xe')
@UseFilters(PrismaClientExceptionFilter)
export class TaiXeController {
  constructor(private readonly taiXeService: TaiXeService,
    private readonly XeService: XeService) {}

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

  @Patch('updateToaDo')
  @ApiResponseProperty({type: TaiXeEntity})
  updateToaDo(
  @Body() updateToaDoDto: UpdateToaDoDto,
  ){
  const {sdt, toaDoGPS} = updateToaDoDto
  return this.taiXeService.updateToaDo(sdt, {toaDoGPS: toaDoGPS});
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
