import { Module } from '@nestjs/common';
import { ChuyenXeService } from './chuyen-xe.service';
import { ChuyenXeController } from './chuyen-xe.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RabbitMQModule } from 'src/rabbit-mq/rabbit-mq.module';



@Module({
  imports: [PrismaModule, ConfigModule, RabbitMQModule],
  controllers: [ChuyenXeController],
  providers: [ChuyenXeService,
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
        })
      },
      inject: [ConfigService],
    }],
  
})
export class ChuyenXeModule {}
