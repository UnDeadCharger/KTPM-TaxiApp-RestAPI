import { Module } from '@nestjs/common';
import { XeService } from './xe.service';
import { XeController } from './xe.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [XeController],
  providers: [XeService],
  imports: [PrismaModule],
  exports:[XeService],
})
export class XeModule {}
