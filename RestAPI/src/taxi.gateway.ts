import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CreateChuyenXeDto } from './chuyen-xe/dto/create-chuyen-xe.dto';
import { ChuyenXeService } from './chuyen-xe/chuyen-xe.service';
import { Socket } from 'socket.io';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { KhachHangsService } from './khach-hangs/khach-hangs.service';
import { TaiXeService } from './tai-xe/tai-xe.service';
import { XeService } from './xe/xe.service';

@WebSocketGateway()
export class DriverGateway {
  //This get a message from Driver and broadcast it to all Driver
  @WebSocketServer() server; //allow access to the server

  //Kick everyone out of room
  @SubscribeMessage('stopDriverRequest')
  async handleRejectingRequest(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: any,
  ): Promise<void> {
    //Client Press Button to stop, emit request to force everyone in the chuyến xe room to leave
    //remove all sockets
    //Xóa chuyến xe temp
    const socketsInRoom = await this.server.in(payload.idChuyenXe).fetchSockets();
    socketsInRoom.forEach((socket: any) => {
      console.log("SOCKET ROOM: ", socket.rooms)
      socket.leave(payload.idChuyenXe)
      console.log("Socket room after leave: ", socket.rooms)
    });
    await this.chuyenXeService.remove(payload.idChuyenXe);
    this.server.emit('stopDriverRequest', payload); // Client side if id match then remove it
    //Stop emitting that damm looking for driver request in customer side
  }

  // Driver active and connect to server socket
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
  }

  // Driver Accept Req From Customer
  constructor(private readonly chuyenXeService: ChuyenXeService, 
              private readonly khachHangService: KhachHangsService,
              private readonly taiXeService: TaiXeService,
              private readonly xeService: XeService) {}
  @SubscribeMessage('acceptingCustomer')
  async broadcastToDriverRealTrip(
    @ConnectedSocket() socket: Socket,
    @MessageBody() tripInfo: CreateChuyenXeDto,
  ): Promise<void> {
    try {
      console.log('Trip Info: ', tripInfo);
      const tripInDB = await this.chuyenXeService.findOne(tripInfo.idChuyenXe)
      // If customer stop req
      if(!tripInDB) {
        this.server.to(socket.id).emit('acceptingCustomer', { status: 'error', message: 'Khách hàng đã hủy yêu cầu chuyến xe.' })
        return;
      }
      const realTrip = await this.chuyenXeService.update(
        tripInfo.idChuyenXe,
        tripInfo,
      );
      // Send a success response back to the client
      const khachHang = await this.khachHangService.findOne(realTrip.idKhachHang);
      this.server.to(socket.id).emit('acceptingCustomer' , { status: 'success', realTrip: realTrip, khachHang: {
        hoTen: khachHang.hoTen,
        soDienThoai: khachHang.soDienThoai,
      } });
      socket.join(tripInfo.idChuyenXe)
      const taiXe = await this.taiXeService.findOne(realTrip.idTaiXe);
      const xe = await this.xeService.findOne(taiXe.idXe);
      this.server.to(tripInfo.idChuyenXe).emit("driverJoinRoom", {
        hoTen: taiXe?.hoTen,
        soDienThoai: taiXe?.soDienThoai,
        bienSoXe: xe?.bienSoXe,
        hieuXe: xe?.hieuXe,
        loaiXe: xe?.loaiXe
      })
      console.log(`Tai Xe ID: ${tripInfo.idTaiXe} join room`)
    } catch (error) {
      console.log(error);
      // Handle the error
      // Send an error response back to the client
      this.server.to(socket.id).emit('acceptingCustomer' ,
        { status: 'error', message: 'Update failed.' },
      );
    }
  }

  // Resend Req To Driver With Radius
  //tripInfo {
  //  chuyenXeDto: CreateChuyenXeDto;
  //  searchRadius: number;}
  @SubscribeMessage('resendRequest')
  broadcastToDrivers(@MessageBody() tripInfo: any): void {
    //Increase search radius
    let searchRadius = tripInfo.searchRadius;
    console.log(searchRadius)
    if (searchRadius <= 6) {
      console.log("Available Customer: ", tripInfo)
      this.server.emit('availableCustomer', tripInfo); //payload is the ChuyenXe
    }
  }

  // Create A Room For Customer To Join And Wait For Driver
  @SubscribeMessage('CreateRideRoom')
  handleMessageForCustomer(socket: Socket, payload: any): void {
    console.log("ID Khach Hang: ", socket.id)
    console.log("Message From Khach Hang: ", payload)
    //Put client into room
    socket.join(payload.idChuyenXe)
    console.log(`Khach Hang ID: ${payload.idKhachHang} join room`)
  }

  // Send driver location to customer in a room
  @SubscribeMessage('RideNotification')
  broadcastMessageInRideRoom(socket: Socket, payload: any) : void {
    console.log("PAYLOAD IN ROOM: ", payload);
    console.log("FROM: ", socket.id)
    // Broadcast Location From Driver
    socket.broadcast.to(payload.idChuyenXe).emit("RideNotification", {lat: payload.lat, lng: payload.lng});
  }

  // Driver Send Message To Done Ride
  @SubscribeMessage('DoneRide')
  async handleDoneRideMessage(socket: Socket, payload: any) : Promise<void> {
    console.log(payload)
    // Update status for ride in DB
    let tripInDB = await this.chuyenXeService.findOne(payload.idChuyenXe)
    tripInDB = {
      ...tripInDB,
      trangThai: 'Đã Hoàn Thành'
    }
    const realTrip = await this.chuyenXeService.update(
      tripInDB.idChuyenXe,
      tripInDB,
    );
    console.log('Trip In DB: ', tripInDB)
    console.log("List Of Rooms: ", this.server.sockets.adapter.rooms)
    const socketsInRoom = await this.server.in(payload.idChuyenXe).fetchSockets();
    socketsInRoom.forEach((socket: any) => {
      console.log("SOCKET ROOM: ", socket.rooms)
      socket.emit("LeaveRideRoom", "Leave Room Successfully")
      socket.leave(payload.idChuyenXe)
      console.log("Socket room after leave: ", socket.rooms)
    });
    console.log("List Of Rooms After Delete Room: ", this.server.sockets.adapter.rooms)
  }
}
