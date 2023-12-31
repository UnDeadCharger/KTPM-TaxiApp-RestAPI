import { Module } from '@nestjs/common';
import { ChuyenXeService } from './chuyen-xe.service';
import { ChuyenXeController } from './chuyen-xe.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RabbitMQModule } from 'src/rabbit-mq/rabbit-mq.module';
import { DriverGateway } from 'src/taxi.gateway';
import { KhachHangsService } from 'src/khach-hangs/khach-hangs.service';
import { TaiXeService } from 'src/tai-xe/tai-xe.service';
import { XeService } from 'src/xe/xe.service';


@Module({
  imports: [PrismaModule, ConfigModule, RabbitMQModule],
  exports:[ChuyenXeService],
  controllers: [ChuyenXeController],
  providers: [
    DriverGateway,
    ChuyenXeService,
    KhachHangsService,
    TaiXeService,
    XeService,
    {
      provide: 'SUBSCRIBERS_SERVICE',
      useFactory: (configService: ConfigService) => {
        const user = configService.get('RABBITMQ_USER');
        const password = configService.get('RABBITMQ_PASSWORD');
        const host = configService.get('RABBITMQ_HOST');
        const queueName = configService.get('RABBITMQ_QUEUE_NAME');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}`],
            queue: queueName,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class ChuyenXeModule {}
