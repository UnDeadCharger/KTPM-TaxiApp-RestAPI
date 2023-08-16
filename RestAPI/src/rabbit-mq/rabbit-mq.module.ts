import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbit-mq.service';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'rabbit-mq-module',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqp://admin:admin@localhost:5672',
          ],
          queue: 'email-subscribers',
        },
      },
    ]),
  ],
  controllers: [],
  providers: [RabbitMQService,
  ],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}

export { RabbitMQService };

