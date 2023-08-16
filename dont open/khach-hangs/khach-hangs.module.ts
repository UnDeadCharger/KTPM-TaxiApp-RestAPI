import { Module } from '@nestjs/common';
import { KhachHangsService } from './khach-hangs.service';
import { KhachHangsController } from './khach-hangs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  controllers: [KhachHangsController],
  providers: [KhachHangsService],
  imports: [PrismaModule],
})
export class KhachHangsModule {}
