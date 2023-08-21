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
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('geocoder')
  public async executeCreateCC(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    // console.log('Data:', data);
    try {
      const result = await this.appService.getGeocode(data);
      console.log('Done Processing GeoCode:', result);
      channel.ack(originalMessage); // Acknowledge after successful processing
      return originalMessage;
    } catch (error) {
      // Handle any errors that occurred during processing
      console.error('Error Processing GeoCode, with message:', error.message);
      // It's a good practice to nack (negative acknowledgment) the message in case of an error
      channel.ack(originalMessage);
      return null;
    }
  }

  // @MessagePattern('rabbit-mq-producer')
  // public async execute(@Payload() data: any, @Ctx() context: RmqContext) {
  //   const channel = context.getChannelRef();
  //   const originalMessage = context.getMessage();
  //   console.log('data', data);
  //   await this.appService.mySuperLongProcessOfUser(data);
  //   channel.ack(originalMessage);
  // }

  // You can also include your getHello() method here if needed
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
