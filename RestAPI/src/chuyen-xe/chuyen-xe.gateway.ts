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
  
  //This get a message from Driver and broadcast it to Database to update ChuyenXe
  @WebSocketServer() server; //allow access to the server which find all subscribers

}
