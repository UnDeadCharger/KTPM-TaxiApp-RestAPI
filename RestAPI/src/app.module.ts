// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { PrismaModule } from './prisma/prisma.module';
// import { KhachHangsModule } from './khach-hangs/khach-hangs.module';
// import { ChuyenXeModule } from './chuyen-xe/chuyen-xe.module';
// import { TaiXeModule } from './tai-xe/tai-xe.module';
// import { XeModule } from './xe/xe.module';
// import { ConfigModule } from '@nestjs/config';

// @Module({
//   imports: [PrismaModule, KhachHangsModule, ChuyenXeModule, TaiXeModule, XeModule, ConfigModule],
//   controllers: [AppController],
//   providers: [AppService],
  
  
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { KhachHangsModule } from './khach-hangs/khach-hangs.module';
import { ChuyenXeModule } from './chuyen-xe/chuyen-xe.module';
import { TaiXeModule } from './tai-xe/tai-xe.module';
import { XeModule } from './xe/xe.module';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from './rabbit-mq/rabbit-mq.module';

@Module({
  imports: [
    PrismaModule,
    KhachHangsModule,
    ChuyenXeModule,
    TaiXeModule,
    XeModule,
    ConfigModule,
    RabbitMQModule, // Include the RabbitMQModule here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
