import { Module } from '@nestjs/common';
import { ChuyenXeService } from './chuyen-xe.service';
import { ChuyenXeController } from './chuyen-xe.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ChuyenXeController],
  providers: [ChuyenXeService],
  imports: [PrismaModule]
})
export class ChuyenXeModule {}
