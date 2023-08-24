import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseFilters,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ChuyenXeService } from './chuyen-xe.service';
import { CreateChuyenXeDto } from './dto/create-chuyen-xe.dto';
import { UpdateChuyenXeDto } from './dto/update-chuyen-xe.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ChuyenXeEntity } from './entities/chuyen-xe.entity';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitMQService } from 'src/rabbit-mq/rabbit-mq.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestChuyenXeDto } from './dto/request-chuyen-xe.dto';
import { DriverGateway } from 'src/taxi.gateway';
// import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';

@Controller('chuyen-xe')
@ApiTags('chuyen-xe')
@UseFilters(PrismaClientExceptionFilter)
export class ChuyenXeController {
  constructor(
    private readonly chuyenXeService: ChuyenXeService,
    private readonly rabbitmqService: RabbitMQService,
    private readonly DriverGateway: DriverGateway,
  ) {}

  //Điều phối
  @UseGuards(AuthGuard)
  @Post('RequestChuyenXe')
  @ApiBearerAuth('jwt')
  async requestChuyenXe(
    @Body()
    requestChuyenXeDto: RequestChuyenXeDto,
  ) {
    //Set up a DTO based on create-chuyen-xe
    const createChuyenXeDto: CreateChuyenXeDto = {
      idChuyenXe: undefined,
      idTaiXe: 'dummy-404860297',
      idKhachHang: requestChuyenXeDto.idKhachHang,
      trangThai: 'Đang chờ',
      diemDon: requestChuyenXeDto.diemDon,
      diemTra: requestChuyenXeDto.diemTra,
      giaTien: requestChuyenXeDto.giaTien,
    };
    //Create a Temp ChuyenXe
    const tempChuyenXe = await this.chuyenXeService.create(createChuyenXeDto);
    //Broadcast CX
    this.DriverGateway.broadcastToDrivers(tempChuyenXe);
    //Wait for confirmation

    return tempChuyenXe;
  }

  //rabbitmq
  @Post(`/ccAddChuyenXe`)
  async createCC(@Body() createChuyenXeDto: CreateChuyenXeDto) {
    const pendingOperations = Array.from(new Array(1)).map(async (_, index) => {
      const message = createChuyenXeDto;
      try {
        // Send the message and await acknowledgment
        const ackStatus = await this.rabbitmqService.sendTT(
          'create-new-trip',
          message,
        );
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

  @Post('/create')
  @ApiCreatedResponse({ type: ChuyenXeEntity })
  create(@Body() createChuyenXeDto: CreateChuyenXeDto) {
    return this.chuyenXeService.create(createChuyenXeDto);
  }

  @Get()
  @ApiCreatedResponse({ type: ChuyenXeEntity, isArray: true })
  findAll() {
    return this.chuyenXeService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ChuyenXeEntity })
  async findOne(@Param('id') id: string) {
    const chuyenxe = await this.chuyenXeService.findOne(id);

    if (!chuyenxe) {
      throw new NotFoundException(`Chuyen xe with id: ${id} does not exist`);
    }
    return chuyenxe;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ChuyenXeEntity })
  update(
    @Param('id') id: string,
    @Body() updateChuyenXeDto: UpdateChuyenXeDto,
  ) {
    return this.chuyenXeService.update(id, updateChuyenXeDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ChuyenXeEntity })
  remove(@Param('id') id: string) {
    return this.chuyenXeService.remove(id);
  }
}
