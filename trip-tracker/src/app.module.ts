import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ChuyenXesModule } from './chuyen-xes/chuyen-xes.module';

@Module({
  imports: [PrismaModule, ChuyenXesModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
