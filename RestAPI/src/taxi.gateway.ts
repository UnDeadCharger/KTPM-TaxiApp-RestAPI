import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CreateChuyenXeDto } from './chuyen-xe/dto/create-chuyen-xe.dto';

@WebSocketGateway(80, { namespace: 'customer' })
export class CustomerGateway {
  //This get a message from Custoemr and broadcast it to all Driver
  @WebSocketServer() server; //allow access to the server

  @SubscribeMessage('lookingForDriver')
  handleMessage(client: any, payload: any): void {
    //allow access to the client
    this.server.emit('availableDriver', 'Hello from server');
  }
}

@WebSocketGateway(81, { namespace: 'driver' })
export class DriverGateway {
  //This get a message from Driver and broadcast it to all Driver
  @WebSocketServer() server; //allow access to the server

  //@SubscribeMessage('lookingForCustomer')
  broadcastToDrivers(@MessageBody() tripInfo: CreateChuyenXeDto): void {
    //allow access to the client
    this.server.emit('availableCustomer', tripInfo); //payload is the ChuyenXe
  }
}
