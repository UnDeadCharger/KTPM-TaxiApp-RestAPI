import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { XeService } from './xe.service';
import { CreateXeDto } from './dto/create-xe.dto';
import { UpdateXeDto } from './dto/update-xe.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { XeEntity } from './entities/xe.entity';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';

@Controller('xe')
@ApiTags('xe')
@UseFilters(PrismaClientExceptionFilter)
export class XeController {
  constructor(private readonly xeService: XeService) {}

  @Post()
  @ApiCreatedResponse({ type: XeEntity })
  create(@Body() createXeDto: CreateXeDto) {
    return this.xeService.create(createXeDto);
  }

  @Get()
  @ApiCreatedResponse({ type: XeEntity })
  findAll() {
    return this.xeService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: XeEntity })
  findOne(@Param('id') id: string) {
    return this.xeService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: XeEntity })
  update(@Param('id') id: string, @Body() updateXeDto: UpdateXeDto) {
    return this.xeService.update(id, updateXeDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: XeEntity })
  remove(@Param('id') id: string) {
    return this.xeService.remove(id);
  }
}
