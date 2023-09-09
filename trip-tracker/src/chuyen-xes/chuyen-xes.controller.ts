import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChuyenXesService } from './chuyen-xes.service';
import { CreateChuyenXesDto } from './dto/create-chuyen-xes.dto';
import { UpdateChuyenXesDto } from './dto/update-chuyen-xes.dto';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
// import { AppService } from 'src/app.service';

@Controller('chuyen-xes')
export class ChuyenXesController {
  constructor(private readonly chuyenXesService: ChuyenXesService) {}
  // , private readonly appService: AppService
  @MessagePattern('create-new-trip')
  public async executeCreateCC(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    // console.log('Data:', data);
    try {
      const result = await this.chuyenXesService.create(data);
      console.log('Done Adding ChuyenXe:', result);
      channel.ack(originalMessage); // Acknowledge after successful processing
      return originalMessage;
    } catch (error) {
      // Handle any errors that occurred during processing
      console.error('Error Creating new trip, with message:', error.message);
      // It's a good practice to nack (negative acknowledgment) the message in case of an error
      channel.nack(originalMessage);
      return null;
    }
  }

  @MessagePattern('get-waiting-ride')
  public async executeGetWaitingRide(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    // console.log('Data:', data);
    try {
      const result = await this.chuyenXesService.getWaitingRide();
      console.log('Done Get Waiting ChuyenXe:', result);
      channel.ack(originalMessage); // Acknowledge after successful processing
      return result;
    } catch (error) {
      // Handle any errors that occurred during processing
      console.error('Error Getting waiting ride, with message:', error.message);
      // It's a good practice to nack (negative acknowledgment) the message in case of an error
      channel.nack(originalMessage);
      return null;
    }
  }

  @MessagePattern('get-on-going-ride')
  public async executeGetOnGoingRide(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    // console.log('Data:', data);
    try {
      const result = await this.chuyenXesService.getOnGoingRide();
      console.log('Done Get on Going ChuyenXe:', result);
      channel.ack(originalMessage); // Acknowledge after successful processing
      return result;
    } catch (error) {
      // Handle any errors that occurred during processing
      console.error('Error Getting on going ride, with message:', error.message);
      // It's a good practice to nack (negative acknowledgment) the message in case of an error
      channel.nack(originalMessage);
      return null;
    }
  }

  @Post()
  create(@Body() createChuyenXDto: CreateChuyenXesDto) {
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
  update(
    @Param('id') id: string,
    @Body() updateChuyenXDto: UpdateChuyenXesDto,
  ) {
    return this.chuyenXesService.update(+id, updateChuyenXDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chuyenXesService.remove(+id);
  }

  @Get('ChuyenXeDangChoChay')
  findRideExceptFinishStatus() {
    return this.chuyenXesService.findRideExceptFinishStatus();
  }
}
