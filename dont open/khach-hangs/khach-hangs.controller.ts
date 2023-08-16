import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { KhachHangsService } from './khach-hangs.service';
import { CreateKhachHangDto } from './dto/create-khach-hang.dto';
import { UpdateKhachHangDto } from './dto/update-khach-hang.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { KhachHangEntity } from './entities/khach-hang.entity';

@Controller('khach-hangs')
@ApiTags('khach-hangs')
export class KhachHangsController {
  //Doi thanh KhachHangService
  constructor(private KhachHangs: KhachHangsService) {}

  @Post('checkRegistered')
  //@ApiCreatedResponse({ type: String })
  checkRegistered(@Body() createKhachHangDto: CreateKhachHangDto) {
    const { soDienThoai } = createKhachHangDto;
    return this.KhachHangs.checkRegistered(soDienThoai);
  }

  //Register account to phone number
  @Post('registerAccount')
  @ApiCreatedResponse({ type: KhachHangEntity })
  registerAccount(@Body() createKhachHangDto: CreateKhachHangDto) {
    return this.KhachHangs.registerAccount(createKhachHangDto);
  }
  //Create a Khach Hang Data transfer object
  //Declare a DTO object, to declare the attribute for object
  @Post()
  @ApiCreatedResponse({ type: KhachHangEntity })
  create(@Body() createKhachHangDto: CreateKhachHangDto) {
    return this.KhachHangs.create(createKhachHangDto);
  }

  @Get()
  @ApiCreatedResponse({ type: KhachHangEntity, isArray: true })
  findAll() {
    return this.KhachHangs.findAll();
  }

  @Get('registered')
  @ApiCreatedResponse({ type: KhachHangEntity, isArray: true })
  findAllRegistered() {
    return this.KhachHangs.findAllRegistered();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: KhachHangEntity })
  findOne(@Param('id') id: string) {
    return this.KhachHangs.findOne(id);
    //return this.Prisma.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: KhachHangEntity })
  update(
    @Param('id') id: string,
    @Body() updateKhachHangDto: UpdateKhachHangDto,
  ) {
    return this.KhachHangs.update(id, updateKhachHangDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: KhachHangEntity })
  remove(@Param('id') id: string) {
    return this.KhachHangs.remove(id);
  }
}
