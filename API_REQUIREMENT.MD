Hệ thống Điều phối Taxi là một ứng dụng đa nền tảng cho phép khách hàng đặt xe taxi thông qua cuộc gọi, ứng dụng di động hoặc trang web. Hệ thống sẽ tìm và gửi thông tin đặt xe tới tài xế thích hợp dựa trên khoảng cách và các yêu cầu khác.

Các thành phần trong hệ thống:

1. Hệ thống tổng đài đặt xe CallCenter(Web/WPF/Winforms):
   Cho phép khách hàng đặt xe thông qua cuộc gọi điện thoại. > Đặt xe functions:
   Thu thập thông tin như số điện thoại, địa chỉ đặt xe từ cuộc gọi.

   > Nhận thông tin từ front end, và tạo khách hàng trong database
   > Tạo Chuyến Xe từ cuộc gọi
   > Mở rộng: Hỗ trợ đặt xe theo hẹn giờ chỉ dành cho khách hàng VIP.

2. App Khách Hàng(Mobile):
   Cho phép khách hàng đặt xe thông qua ứng dụng di động.
   > Mở request đặt xe cho khách hàng
   > Nhận confirmation từ tài xế và tạo chuyến xe
   > Thu thập thông tin như số điện thoại, địa chỉ và tọa độ GPS của khách hàng.
   > Mở rộng: Hỗ trợ chức năng hẹn giờ đặt xe.

Broadcast thông tin:
Khi có thông tin đặt xe từ khách hàng, hệ thống sẽ broadcast thông tin như số điện thoại khách hàng, địa chỉ và tọa độ GPS cho tài xế qua ứng dụng tài xế (Driver Apps).
Thông tin sẽ được gửi đến tài xế có khoảng cách GPS gần nhất.

1. App tài xế (Mobile):
   > Đăng kí tài xế
   > N tài xế nhận thông tin đặt xe và chọn tài xế nhanh nhất để xác nhận.
   > Broadcast cho tài xế về khách
   > Nhận confirmation của tài xế
   > Nếu tài xế đã được xác nhận và hủy, hệ thống sẽ broadcast cho tài xế kế tiếp trong danh sách.
   > Nhận Hủy chuyến xe
   > Sau khi đã có tài xế xác nhận, hệ thống sẽ gửi thông tin về tài xế (tên, số điện thoại, số tài, hình đại diện) cho khách hàng.
   > Gửi thông tin cho khách hàng
   > Nếu khách hàng không sử dụng ứng dụng, hệ thống sẽ gửi tin nhắn SMS cho khách hàng.
   > Nếu khách hàng sử dụng ứng dụng, hệ thống sẽ gửi thông báo qua ứng dụng cho khách hàng.
   > Signal Thông bao tới khach1 hagn2

\*Theo dõi realtime vị trí tài xế trên ứng dụng khách hàng

> Function lấy tài xế location every 3s? (seperate thread??)

Điểm mở rộng(điểm cộng)

- Áp dụng machine learning để đánh giá độ tin tưởng của khách hàng

Technology :

- Real-time : .Net(SignalR, Websocket), Node.js(Websocket), Provider Services
- Message Queue/Message Brokers
- Elastic Search
- Design Patterns
- Solid Principles
- Google Maps/VietBando/...=> Proxy,....
- Micro-Services
- Log Request/Response=> Debug
- Authentication (RefreshToken/AccessToken)

#table
##KhachHang
-idKhachHang
-hoTen
-soDienThoai
-diaChi
-toaDoGPS
-isRegistered
-isVIP

##TaiXe
-idTaiXe
-hoTen
-soDienThoai
-idXe
-toaDoGPS

##Xe
-id
-bienSo
-hieuXe
-loaiXe

##LoaiXe
-id
-LoaiXe

#ChuyenXe
-idChuyenXe
-idTaiXe
-idKhachHang
-trangThai
-diemDon
-diemTra
-giaTien
-gioHen

FIGURE OUT MROE


#PA 2
Part 1: Receive Customer Information (S1)

    Implement a component that receives customer information (phone number, pickup address, vehicle type) from call center staff.
    If the pickup address is already known (from history), directly proceed to dispatch. Otherwise, pass the information to Part 2.
    
    > After answering call, get their phone number, chuyen xe and ask for pick up location or old
    > Query for Khach Hang, ask if they want to use the same old pick up location, if not Send a message to part 2

    > Convert KhachHang to use Lat and Long, and update their location
    > An API that create ChuyenXe for Call Center

Part 2: Geolocation for Unidentified Addresses (S2)

    Implement a component that takes addresses needing geolocation from Part 1.
    Use long-polling or event-driven architecture (e.g., RabbitMQ) to fetch data from a database or queue.
    Perform geolocation (convert pickup address to GPS coordinates) using tools like Google Maps' Geocoding API.
    After geolocation, proceed to dispatch.

      > Send a message with the Address of customer to the Converter(This part)
      > This converter then return the lat and long
      > Send a mussage to the driver app and updating the relevant Khach Hang address containing the lat and long

Part 3: Ride Status Monitoring (S3)

    Implement a component that receives ride information being processed by the system (sorted by decreasing time).
    Similar to Part 2, use long-polling or event-driven architecture (e.g., RabbitMQ) to fetch data from a database or queue.
    After processing, retrieve ride details like request time, assigned driver, and status.

       > Client send a message that request 
       > Use Rabbit MQ to keep the connection

4. Message Flow and Architecture:

    Choose a topology for the event-driven architecture. Options include mediator or broker. Based on your choice, design a message flow that connects the components (S1, S2, S3).

5. Code Implementation:

    Implement the components using your chosen programming language and integrate them with the message broker.
    Use appropriate libraries to interact with the message broker and databases.
    Ensure that the components can publish and subscribe to events/messages for communication.

6. Testing and Validation:

    Test each component's functionality individually and then test the entire system's flow.
    Verify that data is correctly passed between components and processed as expected.

7. Deadline and Submission:

    Ensure that the entire project is completed by the specified deadline.
    Prepare documentation, including explanations of the chosen architecture, message flows, and any design decisions.
    Submit the project on the provided platform (Moodle).

8. Additional Resources:

    Utilize the resources provided in the course materials, such as documentation and tutorials, to guide your implementation.

It's important to note that each part of the application represents a distinct functional module. You'll need to implement each of these modules to create a fully functional ride booking system based on the event-driven architecture. The message broker will serve as the communication backbone between these modules, ensuring efficient and reliable data exchange.