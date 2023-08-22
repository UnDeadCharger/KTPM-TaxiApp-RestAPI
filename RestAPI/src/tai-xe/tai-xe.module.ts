import { Module } from '@nestjs/common';
import { TaiXeService } from './tai-xe.service';
import { TaiXeController } from './tai-xe.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { XeModule } from 'src/xe/xe.module';

@Module({
  controllers: [TaiXeController],
  providers: [TaiXeService],
  imports: [PrismaModule,XeModule],
  exports: [TaiXeService],
})
export class TaiXeModule {}
