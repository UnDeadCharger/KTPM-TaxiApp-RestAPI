import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { KhachHangsModule } from './khach-hangs/khach-hangs.module';

@Module({
  imports: [PrismaModule, KhachHangsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
