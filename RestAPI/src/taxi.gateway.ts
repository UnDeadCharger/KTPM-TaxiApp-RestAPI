import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CreateChuyenXeDto } from './chuyen-xe/dto/create-chuyen-xe.dto';

@WebSocketGateway()
export class CustomerGateway {
  //This get a message from Custoemr and broadcast it to all Driver
  @WebSocketServer() server; //allow access to the server

  //Reject
  @SubscribeMessage('lookingForDriver')
  handleMessage(client: any, payload: any): void {
    //allow access to the client
    this.server.emit('availableDriver', 'Hello from server');
  }
}

@WebSocketGateway()
export class DriverGateway {
  //This get a message from Driver and broadcast it to all Driver
  @WebSocketServer() server; //allow access to the server

  @SubscribeMessage('lookingForCustomer')
  handleMessage(
    @ConnectedSocket() client: any,
    @MessageBody() payload: any,
  ): void {
    console.log(payload);
    client.emit('lookingForCustomer', 'Sub To Socket Successfully');
  }

  //Disconnect

  broadcastToDrivers(@MessageBody() tripInfo: CreateChuyenXeDto): void {
    //allow access to the client
    this.server.emit('lookingForCustomer', tripInfo); //payload is the ChuyenXe
  }
}
