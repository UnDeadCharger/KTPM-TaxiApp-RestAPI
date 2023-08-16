import { Module } from '@nestjs/common';
import { ChuyenXesService } from './chuyen-xes.service';
import { ChuyenXesController } from './chuyen-xes.controller';

@Module({
  controllers: [ChuyenXesController],
  providers: [ChuyenXesService],
})
export class ChuyenXesModule {}
