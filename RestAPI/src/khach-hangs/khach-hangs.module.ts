import { Module } from '@nestjs/common';
import { KhachHangsService } from './khach-hangs.service';
import { KhachHangsController } from './khach-hangs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RabbitMQModule } from 'src/rabbit-mq/rabbit-mq.module';
import { ChuyenXeModule } from 'src/chuyen-xe/chuyen-xe.module';
@Module({
  controllers: [KhachHangsController],
  providers: [
    KhachHangsService,
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
  imports: [PrismaModule, ConfigModule, RabbitMQModule, ChuyenXeModule],
  exports: [KhachHangsService],
})
export class KhachHangsModule {}
