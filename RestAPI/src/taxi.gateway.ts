import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CreateChuyenXeDto } from './chuyen-xe/dto/create-chuyen-xe.dto';
import { ChuyenXeService } from './chuyen-xe/chuyen-xe.service';

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
  handleMessage(@ConnectedSocket() client: any, @MessageBody() payload: any): void {
    console.log(client.id, payload)
    // var time = 1;
    this.server.to(client.id).emit('lookingForCustomer' ,`Sub To Socket Successfully`)
    // setInterval(() => { 
    //   console.log(this.server.eio.clientsCount)
    //   time = time + 1; 
    // }, 1000);
  }

  constructor(private readonly chuyenXeService: ChuyenXeService) {}

  @SubscribeMessage('acceptingCustomer')
  async broadcastToDriverRealTrip(
    @ConnectedSocket() client: any,
    @MessageBody() tripInfo: CreateChuyenXeDto,
  ): Promise<void> {
    console.log(tripInfo)
    try {
      console.log("Update")
      const realTrip = await this.chuyenXeService.update(
        tripInfo.idChuyenXe,
        tripInfo,
      );
      // Send a success response back to the client
      client.send(JSON.stringify({ status: 'success', realTrip }));
    } catch (error) {
      console.log(error)
      // Handle the error
      // Send an error response back to the client
      client.send(
        JSON.stringify({ status: 'error', message: 'Update failed.' }),
      );
    }
  }

  //Disconnect

  broadcastToDrivers(@MessageBody() tripInfo: CreateChuyenXeDto): void {
    //allow access to the client
    this.server.emit('availableCustomer', tripInfo); //payload is the ChuyenXe
  }
}
