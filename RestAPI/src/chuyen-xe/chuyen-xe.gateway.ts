import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CreateChuyenXeDto } from './dto/create-chuyen-xe.dto';
import { ChuyenXeService } from './chuyen-xe.service';

@WebSocketGateway()
export class ChuyenXeGateway {
  constructor(private readonly chuyenXeService: ChuyenXeService) {}
  //This get a message from Driver and broadcast it to Database to update ChuyenXe
  @WebSocketServer() server; //allow access to the server which find all subscribers

  @SubscribeMessage('acceptingCustomer')
  async broadcastToDrivers(
    @MessageBody() tripInfo: CreateChuyenXeDto,
    @ConnectedSocket() client: WebSocket,
  ): Promise<void> {
    try {
      const realTrip = await this.chuyenXeService.update(
        tripInfo.idChuyenXe,
        tripInfo,
      );
      // Send a success response back to the client
      client.send(JSON.stringify({ status: 'success', realTrip }));
    } catch (error) {
      // Handle the error
      // Send an error response back to the client
      client.send(
        JSON.stringify({ status: 'error', message: 'Update failed.' }),
      );
    }
  }

  //Reject
  async stopRequestChuyenXe(@MessageBody() tripInfo: CreateChuyenXeDto): void {
    //allow access to the client
    this.server.emit('CloseItOff', tripInfo); //payload is the ChuyenXe
  }
}
