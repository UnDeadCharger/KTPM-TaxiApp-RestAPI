// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitMQService } from './rabbit-mq/rabbit-mq.module';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}
  // @Get()
  // async getHello() {
  //   const pendingOperations = Array.from(new Array(5)).map(async (_, index) => {
  //     const message = this.appService.getHello() + index;

  //     try {
  //       // Send the message and await acknowledgment
  //       const ackStatus = await this.rabbitMQService.sendTT( 'rabbit-mq-producer',  message );
  //       // ackStatus.subscribe();
  //       console.log(`Message "${message}" ack status: ${ackStatus}`);
  //       return ackStatus
  //     } catch (error) {
  //       console.error(`Error sending message "${message}":`, error);
  //       return null;
  //     }
  //   });

  //   await Promise.all(pendingOperations);

  //   return 'Messages sent to the queue!';
  // }
}
