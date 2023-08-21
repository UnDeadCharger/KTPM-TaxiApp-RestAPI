import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseFilters,
  UseGuards,
  Request,
} from '@nestjs/common';
import { KhachHangsService } from './khach-hangs.service';
import { CreateKhachHangDto } from './dto/create-khach-hang.dto';
import { UpdateKhachHangDto } from './dto/update-khach-hang.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { KhachHangEntity } from './entities/khach-hang.entity';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitMQService } from 'src/rabbit-mq/rabbit-mq.service';
import { GeocoderDTO } from './dto/geocoder.dto';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('khach-hangs')
@ApiTags('khach-hangs')
@UseFilters(PrismaClientExceptionFilter)
export class KhachHangsController {
  //Doi thanh KhachHangService
  constructor(
    private KhachHangs: KhachHangsService,
    private RabbitMQ: RabbitMQService,
  ) {}

  //RabbitMQ
  //rabbitmq
  @Post(`/ccGeocoder`)
  async createCC(@Body() GeocoderDto: GeocoderDTO) {
    const pendingOperations = Array.from(new Array(1)).map(async (_, index) => {
      const message = GeocoderDto;
      try {
        // Send the message and await acknowledgment
        const ackStatus = await this.RabbitMQ.sendGC('geocoder', message);
        // ackStatus.subscribe();
        console.log(`Message "${message}" ack status: ${ackStatus}`);
        return ackStatus;
      } catch (error) {
        console.error(`Error sending message "${message}":`, error);
        return null;
      }
    });

    await Promise.all(pendingOperations);

    return 'Creation Order sent to the queue!';
  }

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
