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
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { KhachHangsService } from 'src/khach-hangs/khach-hangs.service';
import { checkKhachHangDTO } from './dto/check-KH.dto';
// import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';

@Controller('chuyen-xe')
@ApiTags('chuyen-xe')
@UseFilters(PrismaClientExceptionFilter)
export class ChuyenXeController {
  constructor(
    private readonly chuyenXeService: ChuyenXeService,
    private readonly rabbitmqService: RabbitMQService,
    private readonly DriverGateway: DriverGateway,
    private readonly khachHangService: KhachHangsService,
  ) {}

  //Điều phối
  @UseGuards(AccessTokenGuard)
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
      trangThai: 'Đang Chờ',
      diemDon: requestChuyenXeDto.diemDon,
      diemTra: requestChuyenXeDto.diemTra,
      giaTien: requestChuyenXeDto.giaTien,
    }
    //Create a Temp ChuyenXe
    const tempChuyenXe = await this.chuyenXeService.create(createChuyenXeDto);
    //Assign a search radius:
    const broadcastCXWithSearchRadius = { tempChuyenXe, searchRadius: 2 };

    //Broadcast CX
    this.DriverGateway.broadcastToDrivers(broadcastCXWithSearchRadius);
    //Wait for confirmation

    return tempChuyenXe;
  }

  //rabbitmq
  @Post(`/ccAddChuyenXe`)
  async createCC(@Body() checkKH: checkKhachHangDTO) {
    const pendingOperations = Array.from(new Array(1)).map(async (_, index) => {
      const checkKHData = checkKH;
      const checkResult= await this.khachHangService.checkRegistered(checkKHData.soDienThoai)
      let user=null
      if(checkResult.status==0){
        user = await this.khachHangService.create({
          soDienThoai: checkKHData.soDienThoai,
          hoTen: checkKHData.hoTen,
          diaChi: '',
          toaDoGPS: '',
          isRegistered: false,
          isVIP: false,
          refreshToken: '',
          twoFactorAuthenticationSecret: '',
        })
      }
      else {
        user=await this.khachHangService.findOneByPhoneNum(checkKHData.soDienThoai)
      }

      const message: CreateChuyenXeDto = {
        idChuyenXe:undefined,
        idKhachHang:user.idKhachHang,
        idTaiXe:'1',
        trangThai: 'Đang Chờ',
        diemDon: checkKHData.diemDon,
        diemTra: checkKHData.diemTra,
        giaTien: 16000,
        gioHen: null,
      }

      try {
        // Send the message and await acknowledgment
        const ackStatus = await this.rabbitmqService.sendTT(
          'create-new-trip',
          message,
        );
        // ackStatus.subscribe();
        console.log(`Message "${message}" ack status: ${ackStatus}`);
        const broadcastCXWithSearchRadius = { ackStatus, searchRadius: 2 };
        //Broadcast CX
        this.DriverGateway.broadcastToDrivers(broadcastCXWithSearchRadius);
        return ackStatus;
      } catch (error) {
        console.error(`Error sending message "${message}":`, error);
        return null;
      }
    });
    return await Promise.all(pendingOperations);

  }

  @Get(`/ccGetChuyenXeDangCho`)
  async getWaitingRide() {
    const pendingOperations = Array.from(new Array(1)).map(async (_, index) => {
      const message = "";
      try {
        // Send the message and await acknowledgment
        const ackStatus = await this.rabbitmqService.sendTT(
          'get-waiting-ride',
          message,
        );
        // ackStatus.subscribe();
        console.log(`Message "get-waiting-ride" ack status`,ackStatus);
        console.log({list:ackStatus})
        return {list:ackStatus};
      } catch (error) {
        console.error(`Error sending message "get-waiting-ride":`, error);
        return null;
      }
    });

    const result= await Promise.all(pendingOperations);
    console.log(result[0])
    return result[0]
  }

  @Get(`/ccGetChuyenXeDangChay`)
  async getOnGoingRide() {
    const pendingOperations = Array.from(new Array(1)).map(async (_, index) => {
      const message = "";
      try {
        // Send the message and await acknowledgment
        const ackStatus = await this.rabbitmqService.sendTT(
          'get-on-going-ride',
          message,
        );
        // ackStatus.subscribe();
        console.log(`Message "get-on-going-ride" ack status: ${ackStatus}`);
        return {list:ackStatus};
      } catch (error) {
        console.error(`Error sending message "get-on-going-ride":`, error);
        return null;
      }
    });

    const result= await Promise.all(pendingOperations);
    console.log(result[0])
    return result[0]
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
