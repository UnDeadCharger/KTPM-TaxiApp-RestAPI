import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseFilters } from '@nestjs/common';
import { ChuyenXeService } from './chuyen-xe.service';
import { CreateChuyenXeDto } from './dto/create-chuyen-xe.dto';
import { UpdateChuyenXeDto } from './dto/update-chuyen-xe.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ChuyenXeEntity } from './entities/chuyen-xe.entity';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitMQService } from 'src/rabbit-mq/rabbit-mq.service';
// import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';

@Controller('chuyen-xe')
@ApiTags('chuyen-xe')
@UseFilters(PrismaClientExceptionFilter)
export class ChuyenXeController {
  constructor(private readonly chuyenXeService: ChuyenXeService, private readonly rabbitmqService: RabbitMQService) {}

  //rabbitmq
  @Post(`/ccAddChuyenXe`)
  async createCC(@Body() createChuyenXeDto: CreateChuyenXeDto) {
    const pendingOperations = Array.from(new Array(1)).map(async (_, index) => {
      const message = createChuyenXeDto
      try {
        // Send the message and await acknowledgment
        const ackStatus = await this.rabbitmqService.send( 'create-new-trip',  message );
        // ackStatus.subscribe();
        console.log(`Message "${message}" ack status: ${ackStatus}`);
        return ackStatus
      } catch (error) {
        console.error(`Error sending message "${message}":`, error);
        return null;
      }
    });
  
    await Promise.all(pendingOperations);
    
    return 'Creation Order sent to the queue!';
  }

  @Post("/create")
  @ApiCreatedResponse({type: ChuyenXeEntity})
  create(@Body() createChuyenXeDto: CreateChuyenXeDto) {
    return this.chuyenXeService.create(createChuyenXeDto);
  }

  @Get()
  @ApiCreatedResponse({type: ChuyenXeEntity, isArray: true})
  findAll() {
    return this.chuyenXeService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({type: ChuyenXeEntity})
  async findOne(@Param('id') id: string) {
    const chuyenxe = await this.chuyenXeService.findOne(id);
    
    if(!chuyenxe){
      throw new NotFoundException(`Chuyen xe with id: ${id} does not exist`);
      
    }
    return chuyenxe
  }

  @Patch(':id')
  @ApiCreatedResponse({type: ChuyenXeEntity})
  update(@Param('id') id: string, @Body() updateChuyenXeDto: UpdateChuyenXeDto) {
    return this.chuyenXeService.update(id, updateChuyenXeDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({type: ChuyenXeEntity})
  remove(@Param('id') id: string) {
    return this.chuyenXeService.remove(id);
  }
}
