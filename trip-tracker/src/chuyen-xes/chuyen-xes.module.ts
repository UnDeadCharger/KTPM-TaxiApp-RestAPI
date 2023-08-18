import { Module } from '@nestjs/common';
import { ChuyenXesService } from './chuyen-xes.service';
import { ChuyenXesController } from './chuyen-xes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
// import { AppModule } from 'src/app.module';
// import { AppService } from 'src/app.service';

@Module({
  imports: [PrismaModule],
  controllers: [ChuyenXesController],
  providers: [ChuyenXesService],
})
export class ChuyenXesModule {}
