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
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload,
  EventPattern,
} from '@nestjs/microservices';
import { AppService } from './app.service';
// import { CreateChuyenXesDto } from './chuyen-xes/dto/create-chuyen-xes.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('rabbit-mq-producer')
  public async execute(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    console.log('data', data);
    try {
      await this.appService.mySuperLongProcessOfUser(data);
      channel.ack(originalMessage); // Acknowledge after successful processing
      return originalMessage;
    } catch (error) {
      // Handle any errors that occurred during processing
      console.error('Error processing message:', error.message);
      // It's a good practice to nack (negative acknowledgment) the message in case of an error
      channel.nack(originalMessage);
      return null;
    }
  }

  // @MessagePattern({ cmd: 'add-subscriber' })
  // async addSubscriber(@Payload() subscriber: CreateChuyenXDto, @Ctx() context: RmqContext) {
  //   const newSubscriber = await this.subscribersService.addSubscriber(subscriber);

  //   const channel = context.getChannelRef();
  //   const originalMsg = context.getMessage();
  //   channel.ack(originalMsg);

  //   return newSubscriber;
  // }

  // You can also include your getHello() method here if needed
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
