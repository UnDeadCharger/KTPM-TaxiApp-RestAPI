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

  //Kick everyone out of room
  @SubscribeMessage('stopDriverRequest')
  async handleRejectingRequest(
    @ConnectedSocket() client: any,
    @MessageBody() payload: any,
  ): Promise<void> {
    //Client Press Button to stop, emit request to force everyone in the chuyến xe room to leave
    //remove all sockets
    //Xóa chuyến xe temp
    this.server.in(payload.idChuyenXe).disconnectSockets();
    await this.chuyenXeService.remove(payload.idChuyenXe);
    this.server.emit('stopDriverRequest', payload); // Client side if id match then remove it
    //Stop emitting that damm looking for driver request in customer side
  }

  @SubscribeMessage('lookingForCustomer')
  handleMessage(
    @ConnectedSocket() client: any,
    @MessageBody() payload: any,
  ): void {
    console.log(client.id, payload);
    // var time = 1;
    this.server
      .to(client.id)
      .emit('lookingForCustomer', `Sub To Socket Successfully`);
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
    console.log(tripInfo);
    try {
      console.log('Update');
      const realTrip = await this.chuyenXeService.update(
        tripInfo.idChuyenXe,
        tripInfo,
      );
      // Send a success response back to the client
      client.send(JSON.stringify({ status: 'success', realTrip }));
    } catch (error) {
      console.log(error);
      // Handle the error
      // Send an error response back to the client
      client.send(
        JSON.stringify({ status: 'error', message: 'Update failed.' }),
      );
    }
  }

  //resend
  //tripInfo {
  //  chuyenXeDto: CreateChuyenXeDto;
  //  searchRadius: number;}
  @SubscribeMessage('resendRequest')
  broadcastToDrivers(@MessageBody() tripInfo: any): void {
    //Increase search radius
    let { searchRadius } = tripInfo.searchRadius;
    searchRadius = searchRadius + 2;
    if (searchRadius < 6) {
      tripInfo.searchRadius = searchRadius;
      this.server.emit('availableCustomer', tripInfo); //payload is the ChuyenXe
    }
    //Reject
  }
}
