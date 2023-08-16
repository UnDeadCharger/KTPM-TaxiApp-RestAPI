import { Module } from '@nestjs/common';
import { TaiXeService } from './tai-xe.service';
import { TaiXeController } from './tai-xe.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TaiXeController],
  providers: [TaiXeService],
  imports: [PrismaModule],
})
export class TaiXeModule {}
