import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbit-mq.service';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'rabbit-mq-module-gc',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'CC-Geocoding-subscribers',
        },
      },
      {
        name: 'rabbit-mq-module-tt',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'CC-TripTracker-subscribers',
        },
      },
    ]),
  ],
  controllers: [],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}

export { RabbitMQService };
